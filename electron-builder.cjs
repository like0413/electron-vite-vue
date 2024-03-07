const dotenv = require('dotenv')
const fs = require('fs')

function loadEnv() {
  let envPath = ''

  switch (process.env.npm_lifecycle_event) {
    case 'dev':
    case 'build:alpha':
      envPath = '.env.alpha'
      break
    case 'build:beta':
      envPath = '.env.beta'
      break
    case 'build:prod':
      envPath = '.env.prod'
      break
  }

  if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath))
    return envConfig
  } else {
    return {}
  }
}

const { ENV } = loadEnv()

const appId = ENV === 'prod' ? 'com.tingkelai.app' : 'com.beta.tingkelai.app'

module.exports = {
  appId,
  asar: true,
  productName: 'tingkelai',
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
    shortcutName: '听客来',
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
