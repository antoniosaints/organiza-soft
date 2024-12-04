import {
  addMonths,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import { ref } from "vue";

export const namesOfWeekDatePicker = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

export const presetsDatePickerVue = ref([
  {
    label: "Hoje",
    value: [todayStart.toUTCString(), todayEnd.toUTCString()],
  },

  {
    label: "Esta Semana",
    value: [
      startOfWeek(new Date(), { weekStartsOn: 1 }).toUTCString(),
      endOfWeek(new Date(), { weekStartsOn: 1 }).toUTCString(),
    ],
  },

  {
    label: "Este Mês",
    value: [
      startOfMonth(new Date()).toUTCString(),
      endOfMonth(new Date()).toUTCString(),
    ],
  },

  {
    label: "Mês Passado",
    value: [
      startOfMonth(subMonths(new Date(), 1)).toUTCString(),
      endOfMonth(subMonths(new Date(), 1)).toUTCString(),
    ],
  },

  {
    label: "Próximo Mês",
    value: [
      startOfMonth(addMonths(new Date(), 1)).toUTCString(),
      endOfMonth(addMonths(new Date(), 1)).toUTCString(),
    ],
  },

  {
    label: "Nesse Ano",
    value: [
      startOfYear(new Date()).toUTCString(),
      endOfYear(new Date()).toUTCString(),
    ],
  },

  {
    label: "Ano Passado",
    value: [
      startOfYear(subYears(new Date(), 1)).toUTCString(),
      endOfYear(subYears(new Date(), 1)).toUTCString(),
    ],
  },

  {
    label: "Ano Seguinte",
    value: [
      startOfYear(addYears(new Date(), 1)).toUTCString(),
      endOfYear(addYears(new Date(), 1)).toUTCString(),
    ],
  },
]);
