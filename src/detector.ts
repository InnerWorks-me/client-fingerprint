import collect from './collector'
import { version } from '../package.json'
import { Options, SourceResultDict } from './types'

export default class BotDetector {
  url: string
  token: string
  performance: number | undefined
  sources: SourceResultDict | undefined
  result: object | undefined

  constructor(options: Options) {
    this.url = options.url
    this.token = options.token
  }

  async detect(): Promise<boolean> {
    try {
      const timestamp = Date.now()
      this.sources = await collect()
      this.performance = Date.now() - timestamp

      const body = {
        timestamp: timestamp,
        performance: this.performance,
        signals: this.sources,
        version: version,
        token: this.token,
      }

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      this.result = await response.json()
    } catch {
      return false
    }

    return true
  }
}
