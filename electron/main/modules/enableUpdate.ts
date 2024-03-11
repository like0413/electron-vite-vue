import { BrowserWindow, dialog, app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

async function enableUpdate(win: BrowserWindow) {
  autoUpdater.autoDownload = true // 自动下载更新（默认）
  autoUpdater.autoInstallOnAppQuit = true // 在退出时自动安装（默认）

  autoUpdater.checkForUpdates()
  setTimeout(() => {
    autoUpdater.checkForUpdates()
  }, 10 * 1000 * 60)

  // 下载完成
  autoUpdater.on('update-downloaded', (res) => {
    dialog
      .showMessageBox({
        type: 'info',
        title: '发现新版本',
        message: '是否立即更新？',
        buttons: ['是', '否'],
      })
      .then((res) => {
        if (res.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
  })
}

export default enableUpdate
