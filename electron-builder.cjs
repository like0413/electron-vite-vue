const ENV = process.env.npm_lifecycle_event.split(':')[1] ?? 'dev'
const appId = 'com.' + ENV + '.tingkelai.app'
const productName = ENV === 'prod' ? 'tingkelai' : 'tingkelai-' + ENV
const shortcutName = ENV === 'prod' ? '听客来' : '听客来 ' + ENV.charAt(0).toUpperCase() + ENV.slice(1)

module.exports = {
  appId,
  asar: true,
  productName,
  copyright: 'Copyright © 2024 ${author}',
  directories: {
    output: 'release/${version}',
  },
  files: ['dist', 'dist-electron'],
  mac: {
    category: 'public.app-category.medical',
    target: ['dmg'],
    artifactName: '${productName}-Mac-${version}-Installer.${ext}',
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
    artifactName: '${productName}-Windows-${version}-Setup.${ext}',
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
  publish: {
    provider: 'generic',
    url: 'https://like-001.oss-cn-hangzhou.aliyuncs.com/tingkelai-client/' + ENV + '/latest',
  },
}

/**
 * build 下的图标作用于桌面快捷方式、安装包、安装程序、开始菜单
 */
