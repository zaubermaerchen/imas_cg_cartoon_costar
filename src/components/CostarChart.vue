<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartOptions } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
  data: Api.CartoonCostar[]
}
const props = defineProps<Props>()

const options: ChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      position: 'top',
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
}
const dataSet = computed(() => {
  const data = props.data?.slice(0, 25) ?? []
  const labels: string[] = []
  const values: number[] = []
  for (const value of data) {
    labels.push(value.name)
    values.push(value.count)
  }

  return {
    labels: labels,
    datasets: [
      {
        label: '共演回数',
        data: values,
      },
    ]
  }
})
</script>

<template>
  <Bar :chart-data="dataSet" :chart-options="options" />
</template>
