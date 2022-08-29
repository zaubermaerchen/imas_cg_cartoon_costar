<script setup lang="ts">
interface Props {
  data: Api.CartoonCostar[]
}
defineProps<Props>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>名前</th>
        <th>共演回数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(x, i) in data" :key="i">
        <td>{{ x.name }}</td>
        <td>{{ x.count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  tbody tr {
    white-space: nowrap;
    background: #fff;
  }
  tbody tr:nth-child(odd) {
    background: #eee;
  }
</style>
