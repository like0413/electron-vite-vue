const ENV = process.env.npm_lifecycle_event.split(':')[1] ?? 'dev'
const appId = 'com.' + ENV + '.tingkelai.app'
const productName = ENV === 'prod' ? 'tingkelai' : 'tingkelai-' + ENV
const shortcutName = ENV === 'prod' ? '听客来' : '听客来 ' + ENV.charAt(0).toUpperCase() + ENV.slice(1)

let appUrl = ''
switch (ENV) {
  case 'prod':
    appUrl = 'https://www.tingkelai.com/tingkelai'
    break
  case 'beta':
    appUrl = 'https://beta.tingkelai.com/tingkelai'
    break
  case 'alpha':
    appUrl = 'https://alpha.tingkelai.com/tingkelai'
    break
}

module.exports = {
  appId,
  productName,
  asar: true,
  directories: {
    output: 'release/${version}',
  },
  extraMetadata: {
    appUrl, // 注入地址，用于main.ts
  },
  files: ['dist', 'dist-electron'],
  mac: {
    category: 'public.app-category.productivity',
    target: ['dmg'],
    artifactName: '${productName}-Mac-${version}-Installer.${ext}',

    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.plist',
  },
  dmg: {
    sign: false,
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
    artifactName: '${productName}-Windows-${version}-Setup.${ext}',
    // certificateFile: '${env.CSC_WIN_LINK}',
    // certificatePassword: '${env.CSC_WIN_KEY_PASSWORD}',
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
    removeDefaultUninstallWelcomePage: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName,
    // "include": "build/installer.nsh"
  },
  linux: {
    target: ['AppImage'],
    artifactName: '${productName}-Linux-${version}.${ext}',
  },
  // afterSign: 'scripts/notarize.js', // 需要公证就打开
  publish: {
    provider: 'generic',
    url: 'https://like-001.oss-cn-hangzhou.aliyuncs.com/tingkelai-client/' + ENV + '/latest',
  },
}
