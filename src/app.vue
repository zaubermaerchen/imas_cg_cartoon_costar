<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IdolSelector from '@/components/IdolSelector.vue';
import CostarChart from './components/CostarChart.vue';

const name = ref('');
onMounted(() => {
  const parameters: URLSearchParams = new URLSearchParams(window.location.search);
  name.value = parameters.get('name') ?? ''
})
</script>

<template>
  <IdolSelector v-model="name" />
  <CostarChart v-if="name" :name="name" />
</template>
