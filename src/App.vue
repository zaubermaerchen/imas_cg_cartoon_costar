<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import IdolSelector from '@/components/IdolSelector.vue'
import CostarTable from './components/CostarTable.vue'
import CostarChart from './components/CostarChart.vue'
import { getCartoonCostar } from '@/functions/api'

const name = ref('')

const data = ref<Api.CartoonCostar[]>([])
const loadData = async() => {
  const response = await getCartoonCostar(name.value)
  response.sort((a, b) => Math.sign(b.count - a.count))
  data.value = response
}

onMounted(() => {
  const parameters: URLSearchParams = new URLSearchParams(window.location.search)
  name.value = parameters.get('name') ?? ''
})
watch(name, () => void loadData())
</script>

<template>
  <IdolSelector v-model="name" />

  <section v-if="name">
    <CostarTable class="table" :data="data" />
    <CostarChart class="chart" :data="data" />
  </section>
</template>

<style scoped>
  section {
    display: flex;
    flex-direction: row;
    flex-basis: auto;
  }
  .table {
    flex: 1;
  }
  .chart {
    flex: 2;
  }
</style>
