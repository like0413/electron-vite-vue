/**
 * 这里是 mac 公证
 * link:https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
 */

import { notarize } from '@electron/notarize'
import path from 'path'

const ENV = process.env.npm_lifecycle_event.split(':')[1]

const { APPLE_ID, APPLE_PASSWORD, APPLE_TEAM_ID } = process.env

const main = async (context) => {
  const { electronPlatformName, appOutDir } = context

  // 如果不是mac平台，或者不是prod环境，或者没有苹果账号信息，就跳过
  if (electronPlatformName !== 'darwin' || ENV !== 'prod' || !APPLE_ID || !APPLE_PASSWORD || !APPLE_TEAM_ID) {
    console.log('跳过公证')
    return
  }

  console.log('开始公证')
  const appName = context.packager.appInfo.productFilename
  await notarize({
    appBundleId: 'prod.tingkelai.app',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: APPLE_ID,
    appleIdPassword: APPLE_PASSWORD,
    teamId: APPLE_TEAM_ID,
  })
  console.log('公证结束')
}

export default main
