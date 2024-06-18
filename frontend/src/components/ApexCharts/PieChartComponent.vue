<script setup>
import { ref } from 'vue'
const chartOptions = ref({
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
})
const series = [42, 40, 152]

defineOptions({ name: "Grafico de pizza" });

defineProps({
    title: String
})
</script>

<template>
    <apexchart type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
</template>