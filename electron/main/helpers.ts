import dotenv from 'dotenv'
import fs from 'fs'

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


export { loadEnv }
