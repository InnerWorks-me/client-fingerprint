import { BotdError, State } from '../types'

export default function getPlatform(): string {
  const platform = navigator.platform
  if (platform == undefined) {
    throw new BotdError(State.Undefined, 'navigator.appVersion is undefined')
  }
  return platform
}