import { fileURLToPath } from 'node:url'
import { join, dirname, resolve } from 'node:path'

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

export { getEnv, getPath }
