import { Autorize } from "@/autorization";
import { ProdutosRepository } from "@/repositories/patrimonio/produtos/produtosRepository";
import { VendasService } from "@/services/vendas/vendasService";
import { ICarrinhoItem, IProdutoPDV } from "@/types/vendas/ICarrinhoPdv";
import { ICreateVenda } from "@/types/vendas/ICreateVenda";
import { IMetodoPagamento } from "@/types/vendas/IVenda";
import { ScToastUtil } from "@/utils/scToastUtil";
import StorageUtil from "@/utils/storageUtil";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useVendasRelatorioStore } from "../relatorios/vendasRelatorioStore";
import { useLoginStore } from "@/stores/login/loginStore";
const loginStore = useLoginStore();

export const usePontoDeVendasStore = defineStore("pontoDeVendas", () => {
  const carrinho = ref<ICarrinhoItem[]>(
    StorageUtil.get("@organizasoft:carrinhopdv")
      ? JSON.parse(StorageUtil.get("@organizasoft:carrinhopdv")!)
      : []
  );
  const carrinhoComprovante = ref<ICarrinhoItem[]>([]);
  const produtos = ref<IProdutoPDV[]>([]);
  const buscarItem = ref<string>("");
  const totalItens = ref<number>(0);
  const valorTotal = ref<number>(0);
  const isOpenClienteModal = ref<boolean>(false);
  const formaPagamento = ref<IMetodoPagamento>('pix');
  const valorComDesconto = ref<number>(0);
  const clienteVenda = ref<number | null>(null);
  const nomeCliente = ref<string | null>(null);
  const porcentagemDesconto = ref<number>(0);
  const openComprovante = ref<boolean>(false);
  const openCompartilharLink = ref<boolean>(false);
  const linkPagamento = ref<string>('');

  const getProdutos = async () => {
    const prod = await ProdutosRepository.getAll(10, 1, "");
    produtos.value = prod.data.map((produto) => ({ 
      id: produto.id!,
      produto: produto.produto,
      preco: produto.preco,
      categoria: produto.Categoria?.categoria!,
    }));
  }

  watch(buscarItem, async () => {
    const prod = await ProdutosRepository.getAll(10, 1, buscarItem.value);
    produtos.value = prod.data.map((produto) => ({ 
      id: produto.id!,
      produto: produto.produto,
      preco: produto.preco,
      categoria: produto.Categoria?.categoria!,
    }));
  })

  const adicionarAoCarrinho = (produto: IProdutoPDV) => {
    const existingItem = carrinho.value.find((item) => item.id === produto.id);
    if (existingItem) {
      carrinho.value = carrinho.value.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      carrinho.value = [...carrinho.value, { ...produto, quantidade: 1 }];
    }
  };

  const gerarLinkPagamentoPìx = async (id: number) => {
    const vendasRelatorioStore = useVendasRelatorioStore();
    const pix = await VendasService.generatePix(id);
    if (!pix) return;
    linkPagamento.value = pix;
    openCompartilharLink.value = true;
    vendasRelatorioStore.getVendas();
  }

  const gerarCkheckoutPagamentoPìx = async (id: number) => {
    const vendasRelatorioStore = useVendasRelatorioStore();
    const checkout = await VendasService.generateCheckout(id);
    if (!checkout) return;
    linkPagamento.value = checkout;
    openCompartilharLink.value = true;
    vendasRelatorioStore.getVendas();
  }
  const removerDoCarrinho = (produtoId: number) => {
    carrinho.value = carrinho.value.reduce((acc, item) => {
      if (item.id === produtoId) {
        if (item.quantidade > 1) {
          acc.push({ ...item, quantidade: item.quantidade - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as ICarrinhoItem[]);
  };

  const limparCarrinho = () => {
    carrinho.value = [];
  };

  const calcularTotal = computed(() =>
    carrinho.value.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    )
  );

  const totalComDesconto = computed(() => {
    const total = calcularTotal.value;
    return total - total * porcentagemDesconto.value;
  });

  const finalizarVenda = async () => {
    if (!Autorize.can("criar_venda_pdv", "vendas")) {
      ScToastUtil.warning("Você não pode realizar uma venda via PDV!");
      return;
    }
    if (!carrinho.value.length) {
      return ScToastUtil.warning("Carrinho vazio!");
    }

    if (!clienteVenda.value) {
      return ScToastUtil.warning("Selecione um cliente!");
    }

    const venda: ICreateVenda = {
      itens: carrinho.value,
      cliente: clienteVenda.value,
      descricao: "Venda - PDV",
      formaPagamento: formaPagamento.value,
      vendedor: loginStore.dataUserInfosLogged?.id!,
      desconto: porcentagemDesconto.value
    }

    const data = await VendasService.create(venda);
    if (data) {
      carrinhoComprovante.value = carrinho.value;
      carrinho.value = [];
      StorageUtil.remove("@organizasoft:carrinhopdv");
      openComprovante.value = true;
    }
  };

  window.addEventListener("beforeunload", (event: BeforeUnloadEvent) => {
    event.preventDefault();
    carrinho.value.length
      ? StorageUtil.set(
          "@organizasoft:carrinhopdv",
          JSON.stringify(carrinho.value)
        )
      : StorageUtil.remove("@organizasoft:carrinhopdv");
  });

  return {
    gerarLinkPagamentoPìx,
    gerarCkheckoutPagamentoPìx,
    getProdutos,
    carrinho,
    clienteVenda,
    nomeCliente,
    carrinhoComprovante,
    isOpenClienteModal,
    produtos,
    buscarItem,
    totalItens,
    valorTotal,
    formaPagamento,
    valorComDesconto,
    porcentagemDesconto,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    calcularTotal,
    totalComDesconto,
    openComprovante,
    finalizarVenda,
    openCompartilharLink,
    linkPagamento
  };
});
