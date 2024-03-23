import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectHeadless({ headlessFeatures }: ComponentDict): DetectorResponse {
    if (headlessFeatures.state !== State.Success) return false;
    if (headlessFeatures.value?.stealthRating ?? 0 > 0.5) return BotKind.Stealth;
    if (headlessFeatures.value?.likeHeadlessRating ?? 0 > 0.5) return BotKind.Unknown;
    if (headlessFeatures.value?.headlessRating ?? 0 > 0.5) return BotKind.HeadlessChrome;
}