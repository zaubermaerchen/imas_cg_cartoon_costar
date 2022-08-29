<script setup lang="ts">
import {ref, computed, onMounted } from 'vue'
import vSelect from 'vue-select'
import { getCharacterNameList } from '@/functions/api'
import "vue-select/dist/vue-select.css"

interface Props {
  modelValue: string
}
interface Emits {
  (e: 'update:modelValue', value: string): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const name = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})


const nameList = ref<string[]>([])
const loadCharacterNameList = async() => {
  const response = await getCharacterNameList()
  nameList.value = response.names
}

onMounted(() => {
  void loadCharacterNameList()
})
</script>

<template>
  <vSelect v-model="name" :options="nameList" />
</template>
