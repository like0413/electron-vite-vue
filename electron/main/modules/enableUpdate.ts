import { BrowserWindow, dialog, app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import openUpdatePrompt from '../modals/openUpdatePrompt'
import openDownloadProgress from '../modals/openDownloadProgress'

async function enableUpdate(win: BrowserWindow) {
  autoUpdater.autoDownload = false

  autoUpdater.checkForUpdates()
  setTimeout(() => {
    autoUpdater.checkForUpdates()
  }, 10 * 1000 * 60)

  // 有可用更新
  autoUpdater.on('update-available', (info) => {})

  // 下载进度
  autoUpdater.on('download-progress', async (progress) => {
    const downloadPercent = Math.round(progress.percent * 100) / 100
    win.webContents.send('download-progress', downloadPercent)
  })

  // 下载完成
  autoUpdater.on('update-downloaded', (res) => {
    autoUpdater.quitAndInstall()
  })
}

export default enableUpdate
