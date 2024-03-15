import { notarize } from '@electron/notarize'
import path from 'path'

const ENV = process.env.npm_lifecycle_event.split(':')[1]

const { APPLE_ID, APPLE_PASSWORD, APPLE_TEAM_ID } = process.env

const main = async (context) => {
  const { electronPlatformName, appOutDir } = context

  // 如果不是mac平台，或者不是prod环境，或者没有苹果账号信息，就跳过签名
  if (electronPlatformName === 'win32' || ENV !== 'prod' || !APPLE_ID || !APPLE_PASSWORD || !APPLE_TEAM_ID) {
    console.log('跳过签名')
    return
  }

  console.log('开始mac签名')

  const appName = context.packager.appInfo.productFilename

  await notarize({
    appBundleId: 'prod.tingkelai.app',
    appPath: `${appOutDir}/${appName}.app`, // windows下是exe文件，mac下是app文件
    appleId: APPLE_ID,
    appleIdPassword: APPLE_PASSWORD,
    teamId: APPLE_TEAM_ID,
  })
  console.log('签名mac结束')
}

export default main
