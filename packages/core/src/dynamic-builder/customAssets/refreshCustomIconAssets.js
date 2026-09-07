import cacheCustomAssetRecords from './cacheCustomAssetRecords.js';
import getCustomAssetAdapters from './getCustomAssetAdapters.js';
import isEditorLive from '../support/isEditorLive.js';
import normalizeCustomIconRecord from './normalizeCustomIconRecord.js';
import readCustomIconRecords from './readCustomIconRecords.js';

const refreshCustomIconAssets = (editor) =>
  Promise.resolve(getCustomAssetAdapters(editor).icons.listIcons())
    .then((iconRecords) => {
      if (!isEditorLive(editor)) return [];
      cacheCustomAssetRecords(
        'icons',
        (Array.isArray(iconRecords) ? iconRecords : [])
          .map((iconRecord) => normalizeCustomIconRecord(iconRecord))
          .filter(Boolean),
      );
      return readCustomIconRecords();
    })
    .catch(() => readCustomIconRecords());

export default refreshCustomIconAssets;
