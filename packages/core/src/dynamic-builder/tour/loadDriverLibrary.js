import appendDriverStyleLink from './appendDriverStyleLink.js';
import readDriverFactory from './readDriverFactory.js';

let loadPromise = null;

const loadDriverLibrary = (targetDocument, tourSettings) => {
  const targetWindow = targetDocument && targetDocument.defaultView;
  if (!targetWindow || !targetDocument.head) return Promise.resolve(null);
  const readyFactory = readDriverFactory(targetWindow);
  if (readyFactory) return Promise.resolve(readyFactory);
  if (!tourSettings.scriptUrl) return Promise.resolve(null);
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolveLoad) => {
    appendDriverStyleLink(targetDocument, tourSettings);
    const scriptElement = targetDocument.createElement('script');
    scriptElement.src = tourSettings.scriptUrl;
    scriptElement.async = true;
    if (tourSettings.integrity) {
      scriptElement.integrity = tourSettings.integrity;
      scriptElement.crossOrigin = 'anonymous';
    }
    scriptElement.addEventListener('load', () => resolveLoad(readDriverFactory(targetWindow)));
    scriptElement.addEventListener('error', () => resolveLoad(null));
    targetDocument.head.appendChild(scriptElement);
  });
  return loadPromise;
};

export default loadDriverLibrary;
