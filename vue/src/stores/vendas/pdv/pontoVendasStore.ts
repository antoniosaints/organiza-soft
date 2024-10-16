import { defineStore } from "pinia";
import { computed, ref } from "vue";


type IProdutoPDV = {
    id: number
    produto: string
    preco: number
}

// Tipo para representar um item no carrinho
type ICarrinhoItem = IProdutoPDV & { quantidade: number }

export const usePontoDeVendasStore = defineStore("pontoDeVendas", () => {
    const carrinho = ref<ICarrinhoItem[]>([]);
    const produtos = ref<IProdutoPDV[]>([
        { id: 1, produto: "Camisa", preco: 10.0 },
        { id: 2, produto: "Calça", preco: 20.0 },
        { id: 3, produto: "Bermuda", preco: 30.0 },
    ]);
    const buscarItem = ref<string>("");
    const totalItens = ref<number>(0);
    const valorTotal = ref<number>(0);
    const valorComDesconto = ref<number>(0);
    const porcentagemDesconto = ref<number>(0);


    const adicionarAoCarrinho = (produto: IProdutoPDV) => {
        const existingItem = carrinho.value.find((item) => item.id === produto.id)
        if (existingItem) {
            carrinho.value = carrinho.value.map((item) =>
                item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        } else {
            carrinho.value = [...carrinho.value, { ...produto, quantidade: 1 }]
        }
    }

    const removerDoCarrinho = (produtoId: number) => {
        carrinho.value = carrinho.value.reduce((acc, item) => {
            if (item.id === produtoId) {
                if (item.quantidade > 1) {
                    acc.push({ ...item, quantidade: item.quantidade - 1 })
                }
            } else {
                acc.push(item)
            }
            return acc
        }, [] as ICarrinhoItem[])
    }

    const limparCarrinho = () => {
        carrinho.value = []
    }

    const calcularTotal = computed(() =>
        carrinho.value.reduce((total, item) => total + item.preco * item.quantidade, 0)
    )
    
    const totalComDesconto = computed(() => {
        const total = calcularTotal.value
        return total - (total * porcentagemDesconto.value)
    }) 
    
    // Filtra os produtos com base no termo de busca
    const produtosFiltrados = computed(() =>
        produtos.value.filter((produto) =>
            produto.produto.toLowerCase().includes(buscarItem.value.toLowerCase())
        )
    )
    

    return {
        carrinho,
        produtos,
        buscarItem,
        totalItens,
        valorTotal,
        valorComDesconto,
        porcentagemDesconto,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        produtosFiltrados,
        calcularTotal,
        totalComDesconto
    };
});