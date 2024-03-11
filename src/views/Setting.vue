<template>
  <div class="setting">
    <div class="title">设置</div>
    <div class="body">
      <div class="sider">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="menu">
          <a-menu-item key="common">
            <SettingOutlined />
            <span class="nav-text">通用</span>
          </a-menu-item>
          <a-menu-item key="shortCut">
            <DeploymentUnitOutlined />
            <span class="nav-text">快捷键</span>
          </a-menu-item>
          <a-menu-item key="update">
            <upload-outlined />
            <span class="nav-text">更新</span>
          </a-menu-item>
          <a-menu-item key="about">
            <InfoCircleOutlined />
            <span class="nav-text">关于</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="content">
        <div v-show="selectedKeys.includes('common')" title="通用">
          <div class="item">
            <div class="sub-title">启动</div>
            <a-checkbox v-model:checked="isBootLaunch" @change="onBootLaunchChange">开机自动启动</a-checkbox>
          </div>
          <div class="item">
            <div class="sub-title">页面缩放</div>
            <!-- 下拉选择 -->
            <a-select v-model:value="zoomLevel" style="width: 100px">
              <a-select-option value="0.7">70%</a-select-option>
              <a-select-option value="0.8">80%</a-select-option>
              <a-select-option value="0.9">90%</a-select-option>
              <a-select-option value="1">100%</a-select-option>
              <a-select-option value="1.1">110%</a-select-option>
              <a-select-option value="1.2">120%</a-select-option>
              <a-select-option value="1.3">130%</a-select-option>
            </a-select>
          </div>
        </div>

        <div v-show="selectedKeys.includes('shortCut')" title="快捷键">快捷键</div>

        <div v-show="selectedKeys.includes('update')" title="更新">
          <div style="margin-bottom: 12px">当前版本：{{ appInfo.appVersion }}</div>
          <a-button @click="checkForUpdate">检查更新</a-button>
        </div>

        <div v-show="selectedKeys.includes('about')" title="关于">
          <div class="item">
            <div class="sub-title">mac码：</div>
            <div class="mac sub-text">
              {{ macCode }}
              <a-button type="primary" size="small" @click="copyMac">复制</a-button>
            </div>
          </div>
          <div class="item">
            <div class="sub-title">electron版本：</div>
            <div class="sub-text">
              {{ appInfo.electronVersion }}
            </div>
          </div>
          <div class="item">
            <div class="sub-title">chrome版本：</div>
            <div class="sub-text">
              {{ appInfo.chromeVersion }}
            </div>
          </div>
          <div class="item">
            <div class="sub-title">安装目录：</div>
            <div class="sub-text">
              {{ appInfo.appPath }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, reactive, onMounted, watch, toRaw } from 'vue'
import { SettingOutlined, DeploymentUnitOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'

const selectedKeys = ref(['common'])

// 开机自动启动
const isBootLaunch = ref(false)
window.electronAPI.isBootLaunch().then((value: boolean) => {
  isBootLaunch.value = value
})
function onBootLaunchChange() {
  window.electronAPI.setBootLaunch(isBootLaunch.value)
}

// 缩放
const zoomLevel = ref('1')
onMounted(() => {
  window.electronAPI.getZoomLevel().then((value: boolean) => {
    zoomLevel.value = String(value)
  })
})
watch(zoomLevel, (value) => {
  window.electronAPI.setZoom(Number(value))
})

// 检查更新
function checkForUpdate() {
  window.electronAPI.checkForUpdate().then((res: any) => {
    if (res.hasNewVersion) {
      Modal.info({
        title: '发现新版本',
        content: `当前版本：${appInfo.appVersion}，最新版本：${res.newVersion}`,
        okText: '立即更新',
        onOk() {
          window.electronAPI.downloadUpdate()
        },
      })
    } else {
      message.success('当前已是最新版本')
    }
  })
}

// 获取mac地址
const macCode = ref('')
window.electronAPI.getMacAddress().then((mac: string) => {
  macCode.value = mac
})
function copyMac() {
  navigator.clipboard.writeText(macCode.value).then(() => {
    message.success('复制成功')
  })
}

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
</script>

<style scoped lang="scss">
.setting {
  .title {
    height: 45px;
    width: 100%;
    line-height: 45px;
    padding-left: 18px;
    font-size: 16px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .body {
    display: flex;
    height: calc(100vh - 45px);
    .sider {
      width: 200px;
      height: 100%;
      background-color: #f0f2f5;
      .menu {
        width: 100%;
        height: 100%;
        padding: 0 10px;
      }
    }
    .content {
      flex: 1;
      padding: 10px;
      .item {
        margin-top: 24px;
        .sub-title {
          margin-bottom: 8px;
        }
        .sub-text {
          color: #999;
          font-size: 14px;
        }
      }
      .item:first-child {
        margin-top: 12px;
      }
    }
  }
}
</style>
