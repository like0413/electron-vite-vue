import { BrowserWindow, dialog, app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log/main'

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function enableUpdate(win: BrowserWindow) {
  await sleep(1000 * 10) // 等待再检查更新

  autoUpdater.autoDownload = true // 自动下载更新（默认）
  autoUpdater.autoInstallOnAppQuit = true // 在退出时自动安装（默认）

  autoUpdater.checkForUpdates()
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 10 * 1000 * 60)

  autoUpdater.on('error', (err) => {
    log.error('更新出错', err)
  })

  autoUpdater.on('checking-for-update', () => {
    log.info('正在检查更新')
  })

  autoUpdater.on('update-not-available', (res) => {
    log.info('没有新版本', res)
  })

  //  有新版本
  autoUpdater.on('update-available', (res) => {
    log.info('发现新版本', res)
    autoUpdater.downloadUpdate()
  })

  // 下载完成
  autoUpdater.on('update-downloaded', (res) => {
    log.info('下载完成', res)
    dialog
      .showMessageBox({
        type: 'info',
        title: '发现新版本',
        message: '是否立即更新？',
        buttons: ['立即更新', '下次启动时更新'],
      })
      .then((res) => {
        if (res.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
  })
}

export default enableUpdate
