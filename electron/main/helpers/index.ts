import { fileURLToPath } from 'node:url'
import { join, dirname, resolve } from 'node:path'

function getInnerAppUrl() {
  let url = ''

  switch (process.env.npm_lifecycle_event) {
    case 'dev':
    case 'build:alpha':
      url = 'https://alpha.tingkelai.com/tingkelai'
      break
    case 'build:beta':
      url = 'https://beta.tingkelai.com/tingkelai'
      break
    case 'build:prod':
      url = 'https://www.tingkelai.com/tingkelai'
      break
  }

  return url
}

function getEnv() {
  switch (process.env.npm_lifecycle_event) {
    case 'dev':
      return 'dev'
    case 'build:alpha':
      return 'alpha'
    case 'build:beta':
      return 'beta'
    case 'build:prod':
      return 'prod'
  }
}

const getPath = (path: string) => join(dirname(fileURLToPath(import.meta.url)), path)

export { getInnerAppUrl, getEnv, getPath }
