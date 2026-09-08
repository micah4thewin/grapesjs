import createOpenverseAdapter from './createOpenverseAdapter.js';
import createPexelsAdapter from './createPexelsAdapter.js';
import createUnsplashAdapter from './createUnsplashAdapter.js';
import createWikimediaAdapter from './createWikimediaAdapter.js';
import isStockPhotoAdapter from './isStockPhotoAdapter.js';
import readProviderApiKey from './readProviderApiKey.js';

const keyedAdapterFactories = { unsplash: createUnsplashAdapter, pexels: createPexelsAdapter };
const freeAdapterFactories = { wikimedia: createWikimediaAdapter, openverse: createOpenverseAdapter };

const buildKeyedAdapter = (moduleOptions, providerId) => {
  const apiKey = readProviderApiKey(moduleOptions, providerId);
  return apiKey ? keyedAdapterFactories[providerId]({ ...moduleOptions, apiKey }) : null;
};

// Openverse throttles anonymous callers so hard that its thumbnails stop
// loading after a handful of searches, so the keyless default is Wikimedia
// Commons; Openverse stays available by name for sites that want it.
const resolveStockPhotoAdapter = (moduleOptions = {}) => {
  if (isStockPhotoAdapter(moduleOptions.adapter)) return moduleOptions.adapter;
  const providerId = String(moduleOptions.provider || '')
    .trim()
    .toLowerCase();
  if (providerId === 'none') return null;
  if (keyedAdapterFactories[providerId]) return buildKeyedAdapter(moduleOptions, providerId);
  if (freeAdapterFactories[providerId]) return freeAdapterFactories[providerId](moduleOptions);
  return (
    buildKeyedAdapter(moduleOptions, 'unsplash') ||
    buildKeyedAdapter(moduleOptions, 'pexels') ||
    createWikimediaAdapter(moduleOptions)
  );
};

export default resolveStockPhotoAdapter;
