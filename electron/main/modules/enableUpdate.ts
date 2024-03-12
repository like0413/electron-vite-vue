import { dialog, app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log/main'

async function enableUpdate() {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true // 在退出时自动安装（默认）

  autoUpdater.checkForUpdates()
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60 * 60 * 1000)

  autoUpdater.on('error', (err) => {
    log.error('更新出错了', err)
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
        message: '请立即更新版本，防止使用过程中出现问题',
      })
      .then((res) => {
        autoUpdater.quitAndInstall()
      })
  })
}

export default enableUpdate
