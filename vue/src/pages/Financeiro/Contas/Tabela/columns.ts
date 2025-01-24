import IContaTransacao from "@/types/financeiro/IContaTransacao";
import { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableDropDown from "./DataTableDropDown.vue";
import ButtonConta from "./ButtonConta.vue";
import { Checkbox } from "@/components/ui/checkbox";
import BadgeRegra from "./BadgeRegra.vue";
import BadgeContagem from "./BadgeContagem.vue";
import BadgeCor from "./BadgeCor.vue";

export const columnsContasFinanceiro: ColumnDef<IContaTransacao>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Selecionar tudo",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: "Selecionar essa linha",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "conta",
    header: () => h("div", { class: "text-left" }, "Nome da conta"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-left font-medium" },
        h(ButtonConta, { conta: row.original })
      );
    },
  },
  {
    accessorKey: "_count",
    header: () => h("div", { class: "text-left" }, "Lançamentos"),
    cell: ({ row }) => {
      const contagem = row.original._count;
      return h(
        "div",
        { class: "text-left font-medium" },
        h(BadgeContagem, {contagem: contagem?.FinanceiroTransacao!})
      );
    },
  },
  {
    accessorKey: "cor",
    header: () => h("div", { class: "text-left" }, "Cor"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-left font-medium" },
        h(BadgeCor, { cor: row.original.cor || "bg-gray-500" })
      );
    },
  },
  {
    accessorKey: "regra",
    header: () => h("div", { class: "text-left" }, "Regra"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        h(BadgeRegra, { regra: row.getValue("regra") as "privada" | "publica" })
      );
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Ações"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(DataTableDropDown, { conta: row.original })
      );
    },
  },
];
