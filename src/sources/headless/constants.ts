export const enum Platform {
    WINDOWS = 'Windows',
    MAC = 'Mac',
    LINUX = 'Linux',
    ANDROID = 'Android',
    CHROME_OS = 'Chrome OS',
  }
  
export const SYSTEM_FONTS = [
      'caption',
      'icon',
      'menu',
      'message-box',
      'small-caption',
      'status-bar',
  ]  

export const functions = [
    'getGamepads', 'javaEnabled', 'sendBeacon', 'vibrate', 'adAuctionComponents',
    'runAdAuction', 'canLoadAdAuctionFencedFrame', 'canShare', 'share',
    'clearAppBadge', 'getBattery', 'getUserMedia', 'requestMIDIAccess',
    'requestMediaKeySystemAccess', 'setAppBadge', 'webkitGetUserMedia',
    'clearOriginJoinedAdInterestGroups', 'createAuctionNonce', 'deprecatedReplaceInURN',
    'deprecatedURNToURL', 'getInstalledRelatedApps', 'joinAdInterestGroup',
    'leaveAdInterestGroup', 'updateAdInterestGroups', 'registerProtocolHandler',
    'unregisterProtocolHandler',
];

export const GHOST = `
height: 100vh;
width: 100vw;
position: absolute;
left:-10000px;
visibility: hidden;
`

