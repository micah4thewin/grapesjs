import buildCustomFontListMarkup from './buildCustomFontListMarkup.js';
import buildCustomIconListMarkup from './buildCustomIconListMarkup.js';
import isEditorLive from '../support/isEditorLive.js';
import readCustomFontRecords from './readCustomFontRecords.js';
import readCustomIconRecords from './readCustomIconRecords.js';
import refreshCustomFontAssets from './refreshCustomFontAssets.js';
import refreshCustomIconAssets from './refreshCustomIconAssets.js';

const renderListElement = (rootElement, listName, listMarkup) => {
  const listElement = rootElement.querySelector(`[data-db-custom-list="${listName}"]`);
  if (listElement) listElement.innerHTML = listMarkup;
};

const refreshCustomAssetsPanels = (editor, rootElement) =>
  Promise.all([refreshCustomFontAssets(editor), refreshCustomIconAssets(editor)]).then(() => {
    if (!isEditorLive(editor) || !rootElement) return false;
    renderListElement(rootElement, 'fonts', buildCustomFontListMarkup(readCustomFontRecords()));
    renderListElement(rootElement, 'icons', buildCustomIconListMarkup(readCustomIconRecords()));
    return true;
  });

export default refreshCustomAssetsPanels;
