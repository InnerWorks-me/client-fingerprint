import { BotKind, ComponentDict, DetectorResponse, State } from '../types';

export function detectHeadless({ headlessFeatures }: ComponentDict): DetectorResponse | false {
    if (headlessFeatures.state !== State.Success) return false;

    const {
        likeHeadlessRating = 0,
        stealthRating = 0,
        headlessRating = 0,
    } = headlessFeatures.value || {};

    if (likeHeadlessRating > 0.5 || headlessRating > 0.5) {
        return BotKind.Unknown;
    }

    if (stealthRating > 0.5) {
        return BotKind.Stealth;
    }

  return false; // Explicitly return false if no conditions are met
}
