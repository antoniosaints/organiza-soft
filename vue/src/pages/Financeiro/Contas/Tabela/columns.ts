import IContaTransacao from "@/types/financeiro/IContaTransacao";
import { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableDropDown from "./DataTableDropDown.vue";
import { formatFirstLetterUpper, formatRealValue } from "@/utils/formatterUtil";
import ButtonConta from "./ButtonConta.vue";
import { Checkbox } from "@/components/ui/checkbox";

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
    accessorKey: "saldo",
    header: () => h("div", { class: "text-right" }, "Saldo"),
    cell: ({ row }) => {
      const saldo = Number.parseFloat(row.getValue("saldo"));
      return h(
        "div",
        { class: "text-right font-medium" },
        formatRealValue(saldo)
      );
    },
  },
  {
    accessorKey: "regra",
    header: () => h("div", { class: "text-right" }, "Regra"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        formatFirstLetterUpper(row.getValue("regra") as string)
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
