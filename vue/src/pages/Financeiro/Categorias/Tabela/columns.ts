import { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableDropDown from "./DataTableDropDown.vue";
import ButtonConta from "./ButtonConta.vue";
import { Checkbox } from "@/components/ui/checkbox";
import ICategoria from "@/types/financeiro/ICategoria";
import BadgeContagem from "./BadgeContagem.vue";
import BadgeCor from "./BadgeCor.vue";

export const columnsCategoriasFinanceiro: ColumnDef<ICategoria>[] = [
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
    accessorKey: "categoria",
    header: () => h("div", { class: "text-left" }, "Categoria"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-left font-medium" },
        h(ButtonConta, { categoria: row.original })
      );
    },
  },
  {
    accessorKey: "_count",
    header: () => h("div", { class: "text-left" }, "Lançamentos"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-left font-medium" },
        h(BadgeContagem, { contagem: row.original._count?.FinanceiroTransacao || 0 })
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
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Ações"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(DataTableDropDown, { categoria: row.original })
      );
    },
  },
];
