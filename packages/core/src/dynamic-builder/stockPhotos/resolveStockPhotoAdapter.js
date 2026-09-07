import createOpenverseAdapter from './createOpenverseAdapter.js';
import createPexelsAdapter from './createPexelsAdapter.js';
import createUnsplashAdapter from './createUnsplashAdapter.js';
import isStockPhotoAdapter from './isStockPhotoAdapter.js';
import readProviderApiKey from './readProviderApiKey.js';

const keyedAdapterFactories = { unsplash: createUnsplashAdapter, pexels: createPexelsAdapter };

const buildKeyedAdapter = (moduleOptions, providerId) => {
  const apiKey = readProviderApiKey(moduleOptions, providerId);
  return apiKey ? keyedAdapterFactories[providerId]({ ...moduleOptions, apiKey }) : null;
};

const resolveStockPhotoAdapter = (moduleOptions = {}) => {
  if (isStockPhotoAdapter(moduleOptions.adapter)) return moduleOptions.adapter;
  const providerId = String(moduleOptions.provider || '')
    .trim()
    .toLowerCase();
  if (providerId === 'none') return null;
  if (keyedAdapterFactories[providerId]) return buildKeyedAdapter(moduleOptions, providerId);
  if (providerId === 'openverse') return createOpenverseAdapter(moduleOptions);
  return (
    buildKeyedAdapter(moduleOptions, 'unsplash') ||
    buildKeyedAdapter(moduleOptions, 'pexels') ||
    createOpenverseAdapter(moduleOptions)
  );
};

export default resolveStockPhotoAdapter;
