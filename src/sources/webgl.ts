import { BotdError, State } from '../types';

export interface WebGLPayload {
  vendor: string;
  renderer: string;
  parameters: {
    UNMASKED_VENDOR_WEBGL: string;
    UNMASKED_RENDERER_WEBGL: string;
  };
}

export default function getWebGL(): WebGLPayload {
  const canvasElement = document.createElement('canvas');

  if (typeof canvasElement.getContext !== 'function') {
    throw new BotdError(State.NotFunction, 'HTMLCanvasElement.getContext is not a function');
  }

  const webGLContext = canvasElement.getContext('webgl');

  if (webGLContext === null) {
    throw new BotdError(State.Null, 'WebGLRenderingContext is null');
  }

  if (typeof webGLContext.getParameter !== 'function') {
    throw new BotdError(State.NotFunction, 'WebGLRenderingContext.getParameter is not a function');
  }

  // Fetch standard vendor and renderer
  const vendor = webGLContext.getParameter(webGLContext.VENDOR);
  const renderer = webGLContext.getParameter(webGLContext.RENDERER);

  // Access the WEBGL_debug_renderer_info extension
  const debugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) {
    throw new BotdError(State.Undefined, 'WEBGL_debug_renderer_info extension is not supported');
  }

  // Fetch unmasked vendor and renderer using the extension
  const UNMASKED_VENDOR_WEBGL = webGLContext.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  const UNMASKED_RENDERER_WEBGL = webGLContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

  return {
    vendor,
    renderer,
    parameters: {
      UNMASKED_VENDOR_WEBGL: UNMASKED_VENDOR_WEBGL,
      UNMASKED_RENDERER_WEBGL: UNMASKED_RENDERER_WEBGL,
    },
  };
}
