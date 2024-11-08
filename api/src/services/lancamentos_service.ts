import { z } from "zod";
import { LancamentoBodySchema } from "../schemas/financeiro/lancamento_body_schema";
import prismaService from "./prisma_service";
import { createParcelamento } from "../schemas/financeiro/parcelamento_schema";
import { Response } from "express";
import ResponseService from "./response_service";
export class LancamentoService {
  private parcelas: z.infer<typeof createParcelamento>[] = [];
  constructor(
    private data: z.infer<typeof LancamentoBodySchema>,
    private response: Response
  ) {}

  async initialize() {
    this.data.lancamento.contaSistemaId = this.data.contaSistemaId;
    this.verificaEntradaValor();
    this.gerenciaValores();
    this.gerenciaJuros();
    this.verificaEfetivado();
    this.verificaParcelado();
    this.verificaNatureza();
  }
  async verificaEntradaValor() {
    if (
      this.data.hasEntrada &&
      this.data.valorEntrada >= this.data.valorLancamento
    ) {
      return ResponseService.notFound(
        this.response,
        "O Valor da entrada nao pode ser maior ou igual ao valor do lancamento"
      );
    }
  }
  async gerenciaValores() {
    this.data.lancamento.valor = this.data.valorLancamento;
    this.data.lancamento.valorFinal = this.data.valorLancamento;
  }

  async verificaEfetivado() {
    if (this.data.isEfetivado) {
      this.data.lancamento.status = "recebido";
    }
  }
  async gerenciaJuros() {
    if (this.data.lancamento.taxaDesconto! > 0) this.calcularDesconto();
    if (this.data.lancamento.taxaJuros! > 0) this.calcularJuros();
  }
  async verificaParcelado() {
    if (this.data.isParcelado) {
      this.data.lancamento.parcelado = "sim";
      this.data.lancamento.status = "pendente";
    } else {
      this.data.lancamento.parcelado = "nao";
    }
  }
  async verificaNatureza() {
    if (this.data.lancamento.natureza === "receita")
      this.data.lancamento.operacao = "entrada";
    else this.data.lancamento.operacao = "saida";
  }
  async calcularDesconto() {
    this.data.lancamento.desconto =
      this.data.lancamento.taxaDesconto! * this.data.lancamento.valor!;
    this.data.lancamento.valorFinal! -= this.data.lancamento.desconto!;
  }
  async calcularJuros() {
    this.data.lancamento.juros =
      this.data.lancamento.taxaJuros! * this.data.lancamento.valor!;
    this.data.lancamento.valorFinal! += this.data.lancamento.juros!
  }

  async commitLancamento() {
    const [lancamento] = await prismaService.$transaction(async (prisma) => {
      const lancamento = await prisma.financeiroTransacao.create({
        data: {
          ...this.data.lancamento,
        },
      });

      if (this.data.isParcelado) {
        await this.parcelar(lancamento.id);
        await prisma.financeiroParcelamento.createMany({
          data: this.parcelas,
        });
        this.parcelas = [];
      }

      return [lancamento];
    });

    return ResponseService.created(
      this.response,
      { lancamento },
      "Lançamento registrado com sucesso"
    );
  }
  async parcelar(idLancamento: number) {
    let valorAParcelar = this.data.lancamento.valorFinal!;

    if (this.data.hasEntrada && this.data.valorEntrada > 0) {
      valorAParcelar -= this.data.valorEntrada;
      this.parcelas.push({
        parcela: 0,
        valor: this.data.valorEntrada,
        dataVencimento: this.data.dataEntrada!.toISOString(),
        contaSistemaId: this.data.contaSistemaId,
        status: "recebido",
        transacaoId: idLancamento,
        tipo: "entrada",
      });
    }

    const valorParcela = valorAParcelar / this.data.quantidadeParcelas;

    for (let i = 0; i < this.data.quantidadeParcelas; i++) {
      const data = new Date(this.data.dataPrimeiraParcela);

      switch (this.data.periodo) {
        case "semana":
          data.setDate(data.getDate() + i * 7);
          break;
        case "mes":
          data.setMonth(data.getMonth() + i);
          break;
        case "ano":
          data.setFullYear(data.getFullYear() + i);
          break;
      }

      this.parcelas.push({
        parcela: i + 1,
        valor: valorParcela,
        dataVencimento: data.toISOString(),
        contaSistemaId: this.data.contaSistemaId,
        status: "pendente",
        transacaoId: idLancamento,
        tipo: "parcela",
      });
    }
  }
}
