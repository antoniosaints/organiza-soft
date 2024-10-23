import { VendasService } from "@/services/vendas/vendasService";
import { ICarrinhoItem, IProdutoPDV } from "@/types/vendas/ICarrinhoPdv";
import { ICreateVenda } from "@/types/vendas/ICreateVenda";
import { IMetodoPagamento } from "@/types/vendas/IVenda";
import { ScToastUtil } from "@/utils/scToastUtil";
import StorageUtil from "@/utils/storageUtil";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePontoDeVendasStore = defineStore("pontoDeVendas", () => {
  const carrinho = ref<ICarrinhoItem[]>(
    StorageUtil.get("@organizasoft:carrinhopdv")
      ? JSON.parse(StorageUtil.get("@organizasoft:carrinhopdv")!)
      : []
  );
  const carrinhoComprovante = ref<ICarrinhoItem[]>([]);
  const produtos = ref<IProdutoPDV[]>([
    { id: 1, produto: "Camisa", preco: 50.0 },
    { id: 2, produto: "Calça", preco: 70.0 },
    { id: 3, produto: "Bermuda", preco: 50.0 },
    { id: 4, produto: "Terno", preco: 130.0 },
  ]);
  const buscarItem = ref<string>("");
  const totalItens = ref<number>(0);
  const valorTotal = ref<number>(0);
  const formaPagamento = ref<IMetodoPagamento>('pix');
  const valorComDesconto = ref<number>(0);
  const porcentagemDesconto = ref<number>(0);
  const openComprovante = ref<boolean>(false);

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

  const produtosFiltrados = computed(() =>
    produtos.value.filter((produto) =>
      produto.produto.toLowerCase().includes(buscarItem.value.toLowerCase())
    )
  );

  const finalizarVenda = async () => {
    if (!carrinho.value.length) {
      return ScToastUtil.warning("Carrinho vazio!");
    }
    const venda: ICreateVenda = {
      itens: carrinho.value,
      cliente: 1,
      descricao: "Venda - PDV",
      formaPagamento: formaPagamento.value,
      vendedor: 1,
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
    carrinho,
    carrinhoComprovante,
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
    produtosFiltrados,
    calcularTotal,
    totalComDesconto,
    openComprovante,
    finalizarVenda,
  };
});
