function getAppUrl() {
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

export { getAppUrl }
