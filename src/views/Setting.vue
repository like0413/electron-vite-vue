<template>
  <div>{{ macCode }}</div>
</template>

<script lang="ts" setup>
import { h, ref, reactive, onMounted, watch, toRaw } from 'vue'

const macCode = ref('')

// 获取mac地址
window.electronAPI.getMacAddress().then((mac: string) => {
  macCode.value = mac
})
</script>

<style scoped lang="scss"></style>
