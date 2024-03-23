import { BotKind, DetectorResponse, State, BotdError } from '../types';

export function detectCDPRuntimeDomain(): DetectorResponse {
  try {
    let stackAccessed = false;
    const error = new Error();
    Object.defineProperty(error, 'stack', {
      get: function() {
        stackAccessed = true;
        return '';
      }
    });

    console.debug(error);

    if (stackAccessed) {
      return BotKind.Unknown;
    }
    return false;
  } catch (e) {
    throw new BotdError(State.UnexpectedBehaviour, 'Error in CDPRuntimeDomain detection');
  }
}