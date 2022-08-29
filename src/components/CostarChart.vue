<script setup lang="ts">
import {ref, computed, toRefs, onMounted, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartOptions } from 'chart.js'
import { getCartoonCostar } from '@/functions/api'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
  name: string
}
const props = defineProps<Props>()
const { name } = toRefs(props)

const response = ref<Api.GetCartoonCostarResponse | null>(null)
const loadData = async() => {
  response.value = await getCartoonCostar(name.value)
}

const options: ChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      position: 'top',
      beginAtZero: true,
      ticks: {
        stepSize: 1
      },
    },
  },
}
const data = computed(() => {
  if (response.value === null) {
    return null
  }
  const results = Array.from(response.value)

  results.sort((a, b) => b.count - a.count)

  return results
})
const dataSet = computed(() => {
  const labels: string[] = []
  const values: number[] = []
  for (const value of data?.value ?? []) {
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

onMounted(() => void loadData())
watch(name, () => void loadData())
</script>

<template>
  <Bar :chart-data="dataSet" :chart-options="options" />
</template>
