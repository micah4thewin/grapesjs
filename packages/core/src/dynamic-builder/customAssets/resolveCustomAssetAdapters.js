import createLocalCustomFontAdapter from './createLocalCustomFontAdapter.js';
import createLocalCustomIconAdapter from './createLocalCustomIconAdapter.js';
import hasAdapterApi from './hasAdapterApi.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveCustomAssetAdapters = (pluginOptions) => {
  const moduleOptions =
    isPlainRecord(pluginOptions) && isPlainRecord(pluginOptions.customAssets) ? pluginOptions.customAssets : {};
  const fontAdapter = moduleOptions.fontAdapter;
  const iconAdapter = moduleOptions.iconAdapter;
  return {
    fonts: hasAdapterApi(fontAdapter, ['listFonts', 'writeFont', 'deleteFont'])
      ? fontAdapter
      : createLocalCustomFontAdapter(),
    icons: hasAdapterApi(iconAdapter, ['listIcons', 'writeIcon', 'deleteIcon'])
      ? iconAdapter
      : createLocalCustomIconAdapter(),
    maxFontBytes: Math.max(1024, Math.round(Number(moduleOptions.maxFontBytes) || 2097152)),
    maxIconBytes: Math.max(512, Math.round(Number(moduleOptions.maxIconBytes) || 131072)),
  };
};

export default resolveCustomAssetAdapters;
