import { BotdError, State,WorkerResponse } from '../types';

// Define a type for the worker response to ensure type safety

async function getWorkerProperties(): Promise<WorkerResponse> {
  return new Promise((resolve, reject) => {
    const timeoutDuration = 10000; // 10 seconds for timeout

    // Updated workerScript as per your request
    const workerScript = `
      const getWebglData = () => {
          try {
              const canvasOffscreenWebgl = new OffscreenCanvas(256, 256);
              const contextWebgl = canvasOffscreenWebgl.getContext('webgl');
              if (!contextWebgl) {
                  throw new Error('WebGL context not available');
              }
              const rendererInfo = contextWebgl.getExtension('WEBGL_debug_renderer_info');
              if (!rendererInfo) {
                  throw new Error('WEBGL_debug_renderer_info not available');
              }
              return {
                  webglVendor: contextWebgl.getParameter(rendererInfo.UNMASKED_VENDOR_WEBGL),
                  webglRenderer: contextWebgl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL),
              };
          } catch (error) {
              console.error('Error getting WebGL data:', error);
              return { webglVendor: 'Unavailable', webglRenderer: 'Unavailable' };
          }
      };

      onmessage = async ({data}) => {
          if (data.action === 'collectFeatures') {
              const webglData = getWebglData();
              postMessage({
                  workerPlatform: navigator.platform ?? null,
                  workerHardwareConcurrency: navigator.hardwareConcurrency ?? null,
                  workerDeviceMemory: navigator.deviceMemory ?? null,
                  workerLanguage: navigator.language ?? null,
                  workerLanguages: navigator.languages ?? null,
                  workerUserAgent: navigator.userAgent ?? null,
                  workerWebglVendor: webglData.webglVendor ?? null,
                  workerWebglRenderer: webglData.webglRenderer ?? null,
                  workerTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
              });
          }
      };
    `;

    const blob = new Blob([workerScript], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    // Clean up blob URL immediately after worker creation
    URL.revokeObjectURL(workerUrl);

    const timeoutId = setTimeout(() => {
      worker.terminate();
      reject(new BotdError(State.UnexpectedBehaviour, "Worker feature collection timed out."));
    }, timeoutDuration);

    worker.onmessage = (event) => {
      clearTimeout(timeoutId);
      worker.terminate(); // Optionally terminate the worker after use
      resolve(event.data as WorkerResponse);
    };

    worker.onerror = (error) => {
      clearTimeout(timeoutId);
      worker.terminate();
      reject(new BotdError(State.UnexpectedBehaviour, `Worker encountered an error: ${error.message}`));
    };

    worker.postMessage({ action: 'collectFeatures' });
  });
}

export default getWorkerProperties;

