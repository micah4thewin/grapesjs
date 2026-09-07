import cacheCustomAssetRecords from './cacheCustomAssetRecords.js';
import getCustomAssetAdapters from './getCustomAssetAdapters.js';
import isEditorLive from '../support/isEditorLive.js';
import normalizeCustomFontRecord from './normalizeCustomFontRecord.js';
import readCustomFontRecords from './readCustomFontRecords.js';
import refreshFontFamilyStyleOptions from './refreshFontFamilyStyleOptions.js';
import registerCustomFontFaces from './registerCustomFontFaces.js';

const refreshCustomFontAssets = (editor) =>
  Promise.resolve(getCustomAssetAdapters(editor).fonts.listFonts())
    .then((fontRecords) => {
      if (!isEditorLive(editor)) return [];
      cacheCustomAssetRecords(
        'fonts',
        (Array.isArray(fontRecords) ? fontRecords : [])
          .map((fontRecord) => normalizeCustomFontRecord(fontRecord))
          .filter(Boolean),
      );
      registerCustomFontFaces(editor);
      refreshFontFamilyStyleOptions(editor);
      return readCustomFontRecords();
    })
    .catch(() => readCustomFontRecords());

export default refreshCustomFontAssets;
