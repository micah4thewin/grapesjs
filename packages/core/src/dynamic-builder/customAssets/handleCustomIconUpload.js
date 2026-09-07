import cleanCustomAssetLabel from './cleanCustomAssetLabel.js';
import formatByteSizeText from '../support/formatByteSizeText.js';
import getCustomAssetAdapters from './getCustomAssetAdapters.js';
import isEditorLive from '../support/isEditorLive.js';
import readFileAsText from '../persistence/readFileAsText.js';
import refreshCustomAssetsPanels from './refreshCustomAssetsPanels.js';
import rejectUnsafeCustomIcon from './rejectUnsafeCustomIcon.js';
import sanitizeCustomIconMarkup from './sanitizeCustomIconMarkup.js';
import showToastNotice from '../support/showToastNotice.js';

const readIconFieldValue = (rootElement, fieldAttribute) => {
  const fieldElement = rootElement.querySelector('[' + fieldAttribute + ']');
  return fieldElement ? String(fieldElement.value || '') : '';
};

const resetIconForm = (rootElement) =>
  ['data-db-custom-icon-file', 'data-db-custom-icon-name', 'data-db-custom-icon-keywords'].forEach((fieldAttribute) => {
    const fieldElement = rootElement.querySelector('[' + fieldAttribute + ']');
    if (fieldElement) fieldElement.value = '';
  });

const handleCustomIconUpload = (editor, rootElement) => {
  const adapters = getCustomAssetAdapters(editor);
  const fileElement = rootElement.querySelector('[data-db-custom-icon-file]');
  const fileObject = fileElement && fileElement.files ? fileElement.files[0] : null;
  if (!fileObject) {
    showToastNotice(editor, 'Choose an SVG file first.', { kind: 'warning' });
    return Promise.resolve(false);
  }
  const fileName = String(fileObject.name || 'icon.svg');
  if (!/\.svg$/i.test(fileName) || Number(fileObject.size) > adapters.maxIconBytes) {
    showToastNotice(editor, 'Use an SVG file smaller than ' + formatByteSizeText(adapters.maxIconBytes) + '.', {
      kind: 'warning',
    });
    return Promise.resolve(false);
  }
  const labelText =
    cleanCustomAssetLabel(readIconFieldValue(rootElement, 'data-db-custom-icon-name')) ||
    cleanCustomAssetLabel(fileName.replace(/\.svg$/i, ''));
  return readFileAsText(fileObject)
    .then((iconMarkup) => {
      if (!isEditorLive(editor)) return false;
      const safeMarkup = sanitizeCustomIconMarkup(iconMarkup);
      if (!safeMarkup) return rejectUnsafeCustomIcon(editor, fileName);
      return adapters.icons.writeIcon({
        label: labelText || 'My icon',
        keywords: readIconFieldValue(rootElement, 'data-db-custom-icon-keywords'),
        markup: safeMarkup,
        fileName,
        byteSize: Number(fileObject.size) || 0,
        addedAt: new Date().toISOString(),
      });
    })
    .then((savedRecord) => {
      if (!savedRecord || !isEditorLive(editor)) return false;
      resetIconForm(rootElement);
      showToastNotice(editor, savedRecord.label + ' is ready to use', { kind: 'success' });
      editor.trigger('db:custom-icon:added', { iconName: savedRecord.iconName, label: savedRecord.label });
      return refreshCustomAssetsPanels(editor, rootElement);
    })
    .catch((writeError) => {
      if (isEditorLive(editor)) showToastNotice(editor, String(writeError.message || writeError), { kind: 'error' });
      return false;
    });
};

export default handleCustomIconUpload;
