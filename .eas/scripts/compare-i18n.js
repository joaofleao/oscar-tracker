/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
import { readFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap((key) => {
    const value = obj[key]
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null) {
      return getKeys(value, fullKey)
    }
    return fullKey
  })
}

const basePath = resolve(__dirname, '../../src/i18n/locales')
const en = JSON.parse(readFileSync(join(basePath, 'en_US.json'), 'utf8'))
const pt = JSON.parse(readFileSync(join(basePath, 'pt_BR.json'), 'utf8'))

const enKeys = getKeys(en).sort()
const ptKeys = getKeys(pt).sort()

const missingInPt = enKeys.filter((k) => !ptKeys.includes(k))
const extraInPt = ptKeys.filter((k) => !enKeys.includes(k))

if (missingInPt.length || extraInPt.length) {
  if (missingInPt.length) {
    console.error('Missing keys in pt_BR.json:', missingInPt)
  }
  if (extraInPt.length) {
    console.error('Extra keys in pt_BR.json:', extraInPt)
  }
  process.exit(1)
} else {
  console.log('i18n files have matching keys!')
}
