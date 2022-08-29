<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import IdolSelector from '@/components/IdolSelector.vue'
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
  <CostarChart v-if="name" :data="data" />
</template>
