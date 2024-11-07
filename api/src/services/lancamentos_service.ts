import { z } from "zod";
import { createTransacao } from "../schemas/financeiro/transacao_schema";
import { generateUniqueIdWithPrefix } from "../utils/tools/UniqueId";

type ITipoIntervalo = "dia" | "semana" | "mes" | "ano";
export class LancamentoService {
  private parcelas: { parcela: number; valor: number; dataVencimento: Date }[] =
    [];
  constructor(private transacao: z.infer<typeof createTransacao>) {
    this.transacao.valorFinal = this.transacao.valor - this.transacao.desconto!; // calcula o valor final
    this.transacao.codigoLancamento = generateUniqueIdWithPrefix("LCM"); // gera o codigo do lancamento
    if (this.transacao.parcelado === "sim") this.transacao.status = "pendente"; // se for parcelado, o status é pendente
    if (this.transacao.taxaJuros)
      this.transacao.juros =
        this.transacao.taxaJuros * this.transacao.valorFinal;
    if (this.transacao.taxaDesconto)
      this.transacao.desconto =
        this.transacao.taxaDesconto * this.transacao.valorFinal;
  }
  async adicionarDesconto(taxa: number) {
    // adiciona desconto
    this.transacao.taxaDesconto = taxa; // adiciona a taxa de desconto
    this.transacao.desconto =
      this.transacao.taxaDesconto * this.transacao.valorFinal; // calcula o desconto
    return this;
  }
  async adicionarJuros(taxa: number) {
    this.transacao.taxaJuros = taxa;
    this.transacao.juros = this.transacao.taxaJuros * this.transacao.valorFinal;
    return this;
  }
  async parcelar(
    parcelas: number,
    dataVencimento: string,
    intervalo: ITipoIntervalo = "mes"
  ) {
    const valorParcela = this.transacao.valorFinal / parcelas;

    for (let i = 0; i < parcelas; i++) {
      const data = new Date(dataVencimento);

      switch (intervalo) {
        case "dia":
          data.setDate(data.getDate() + i);
          break;
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
        dataVencimento: data,
      });
    }
  }
}
