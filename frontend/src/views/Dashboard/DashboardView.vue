<script setup>
import EntradasSaidas from '@/views/Financeiro/Graficos/EntradasSaidas.vue';
import ValorVisual from '@/views/Financeiro/Cards/ValorVisual.vue';
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
onMounted(() => {
  initFlowbite();
})
const chartOptions = {
  stroke: {
    width: 0
  },
  plotOptions: {
    bar: {
      borderRadius: 5
    }
  },
  labels: ["Pix", "Cartão", "Boleto"],
  chart: {
    id: 'basic-bar',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: {
      show: false
    }
  },
  xaxis: {
    axisTicks: {
      show: false // Esconde os ticks do eixo X
    },
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    categories: [1991, 1992]
  },
  yaxis: {
    labels: {
      show: false
    },
    lines: {
      show: false
    }
  },
  legend: {
    show: true,
    position: "bottom",
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    markers: {
      radius: 100
    },
    labels: {
      colors: '#90A4AE'
    }
  },
  tooltip: {
    theme: "dark",
    followCursor: true
  },
  grid: {
    show: false,
    borderColor: '#90A4AE',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      axisTicks: {
        show: false // Esconde os ticks do eixo X
      },
      labels: {
        show: false
      },
      lines: {
        show: false
      }
    },
    yaxis: {
      axisTicks: {
        show: false // Esconde os ticks do eixo X
      },
      labels: {
        show: false
      },
      lines: {
        show: false
      }
    },
    row: {
      colors: undefined,
      opacity: 0.5
    },
    column: {
      colors: undefined,
      opacity: 0.5
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return Number(val).toFixed(0) + "%";
    },
    style: {
      fontSize: '12px',
      colors: ["white"]
    }
  }
}
const series = [42, 40, 152]

</script>
<template>
  <div>
    <nav
      class="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a href="#"
              class="ms-1 text-sm font-medium text-gray-900 hover:text-emerald-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Transações</a>
          </div>
        </li>
      </ol>
    </nav>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      <div class="flex flex-col gap-4">
        <EntradasSaidas></EntradasSaidas>
      </div>
      <div class="flex flex-col gap-4">
        <ValorVisual label="Recebido" valor="12,423" percent="23%" color="green" />
        <ValorVisual label="A receber" valor="2,423" percent="5%" color="red" />
      </div>
      <div class="flex flex-col gap-4">
        <div class="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-4">

          <div class="flex justify-between mb-3">
            <div class="flex justify-center items-center">
              <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white pe-1">Formas de pagamento</h5>
              <svg data-popover-target="chart-info" data-popover-placement="bottom"
                class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
              </svg>
              <div data-popover id="chart-info" role="tooltip"
                class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                <div class="p-3 space-y-2">
                  <h3 class="font-semibold text-gray-900 dark:text-white">Formas de pagamento</h3>
                  <p>Esse demonstrativo revela quais as formas de pagamentos mais utilizadas em suas transações.</p>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Cálculo</h3>
                  <p>O cálculo de porcentagem baseia-se no valor total de transações.</p>
                </div>
                <div data-popper-arrow></div>
              </div>
            </div>
            <div>
              <button type="button" data-tooltip-target="data-tooltip" data-tooltip-placement="bottom"
                class="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg
                  class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 16 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                </svg><span class="sr-only">Download data</span>
              </button>
              <div id="data-tooltip" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Download CSV
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>

          <!-- Donut Chart -->
          <div class="py-2">
            <apexchart type="donut" :options="chartOptions" :labels="labels" :series="series"></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>