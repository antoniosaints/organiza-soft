<template>
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>

const series = [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
}];
const chartOptions = {
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
        id: 'bar_chart-bar',
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
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 0
    },
    plotOptions: {
        bar: {
            borderRadius: 5
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
};
</script>