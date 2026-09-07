import describeMissingProviderNotice from './describeMissingProviderNotice.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveStockPhotoAdapter from './resolveStockPhotoAdapter.js';

const readMaxImageDimension = (moduleOptions, mediaOptions) => {
  const configuredValue = Number(moduleOptions.maxImageDimension || mediaOptions.maxImageDimension);
  return Number.isFinite(configuredValue) && configuredValue > 0 ? Math.round(configuredValue) : 1600;
};

const resolveStockPhotoOptions = (pluginOptions) => {
  const allOptions = isPlainRecord(pluginOptions) ? pluginOptions : {};
  const moduleOptions = isPlainRecord(allOptions.stockPhotos) ? allOptions.stockPhotos : {};
  const mediaOptions = isPlainRecord(allOptions.mediaComponents) ? allOptions.mediaComponents : {};
  const photoAdapter = resolveStockPhotoAdapter(moduleOptions);
  return {
    enabled: moduleOptions.enabled !== false,
    adapter: photoAdapter,
    provider: photoAdapter ? photoAdapter.describeProvider() : null,
    missingProviderNotice: photoAdapter ? '' : describeMissingProviderNotice(moduleOptions),
    maxImageDimension: readMaxImageDimension(moduleOptions, mediaOptions),
  };
};

export default resolveStockPhotoOptions;
