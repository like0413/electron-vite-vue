<template>
  <a-layout has-sider class="setting">
    <div class="title">设置</div>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: '45px',
        bottom: 0,
        backgroundColor: '#fff',
      }"
    >
      <a-menu mode="inline" class="menu">
        <a-menu-item key="1">
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <span class="nav-text">nav 5</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </a-layout>
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

<style scoped lang="scss">
.setting {
  .title {
    height: 45px;
    line-height: 45px;
    padding-left: 24px;
    font-size: 16px;
  }
  .menu {
    width: 100%;
    height: calc(100vh - 45px);
    padding: 0 10px;
  }
}
</style>
