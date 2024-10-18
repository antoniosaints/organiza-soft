import { ChartCandlestick, Fingerprint, Tag, TreePalm, User } from "lucide-vue-next";
import { computed, h, ref } from "vue";

export const cardData = ref([
  {
    id: 1,
    message: "Me ajude a planejar uma viagem de férias",
    icon: TreePalm,
    iconColor: "text-rose-500",
  },
  {
    id: 2,
    message: "Quero informações sobre uma conta do sistema",
    icon: Fingerprint,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    message: "Quero informações sobre um usuário",
    icon: User,
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    message: "Me ajude a calcular o balanço da minha empresa",
    icon: ChartCandlestick,
    iconColor: "text-orange-500",
  },
  {
    id: 5,
    message: "Quero lançar uma nova venda no sistema",
    icon: Tag,
    iconColor: "text-cyan-500",
  },
  {
    id: 6,
    message: "Me ajude a lançar um novo usuário",
    icon: User,
    iconColor: "text-purple-500",
  },
]);

const generateIcon = (component: any, colorClass: string) => {
  return h(component, { class: `w-5 h-5 ${colorClass}` });
};

export const randomCards = computed(() => {
  const shuffledCards = [...cardData.value].sort(() => Math.random() - 0.5);
  return shuffledCards.slice(0, 3).map((card) => ({
    ...card,
    icon: generateIcon(card.icon, card.iconColor),
  }));
});
