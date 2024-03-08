<template>
  <div>{{ appInfo }}</div>
</template>

<script lang="ts" setup>
import { h, ref, reactive, onMounted, watch, toRaw } from 'vue'

// 获取mac地址
const macCode = ref('')
window.electronAPI.getMacAddress().then((mac: string) => {
  macCode.value = mac
})

// 获取版本信息
const appInfo = reactive({
  appVersion: '',
  electronVersion: '',
  chromeVersion: '',
  appPath: '',
})
window.electronAPI.getVersion().then((info: any) => {
  appInfo.appVersion = info.appVersion
  appInfo.electronVersion = info.electronVersion
  appInfo.chromeVersion = info.chromeVersion
  appInfo.appPath = info.appPath
})

// 开机自动启动
const isBootLaunch = ref(false)
window.electronAPI.isBootLaunch().then((value: boolean) => {
  isBootLaunch.value = value
})
function onBootLaunchChange() {
  window.electronAPI.setBootLaunch(isBootLaunch.value)
}
</script>

<style scoped lang="scss"></style>
