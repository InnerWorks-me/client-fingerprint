import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectMismatchWorkerProperties({ workerProperties, platform  }: ComponentDict): DetectorResponse {
    if (workerProperties.state !== State.Success || platform.state !== State.Success) return false
    const { workerPlatform } = workerProperties.value
    if (workerPlatform !== platform.value) return BotKind.Unknown    
}