import { fileURLToPath } from 'node:url'
import { join, dirname, resolve } from 'node:path'

const getPath = (path: string) => join(dirname(fileURLToPath(import.meta.url)), path)

export { getPath }
