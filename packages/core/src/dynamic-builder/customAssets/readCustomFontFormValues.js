import clampCustomFontWeight from './clampCustomFontWeight.js';
import formatByteSizeText from '../support/formatByteSizeText.js';
import getFontFileFormatName from './getFontFileFormatName.js';
import sanitizeFontFamilyName from '../typography/sanitizeFontFamilyName.js';

const readFieldValue = (rootElement, fieldAttribute) => {
  const fieldElement = rootElement.querySelector('[' + fieldAttribute + ']');
  return fieldElement ? String(fieldElement.value || '') : '';
};

const readCustomFontFormValues = (rootElement, maxFontBytes) => {
  const fileElement = rootElement.querySelector('[data-db-custom-font-file]');
  const fileObject = fileElement && fileElement.files ? fileElement.files[0] : null;
  if (!fileObject) return { errorText: 'Choose a font file first.' };
  const formatName = getFontFileFormatName(fileObject.name);
  if (!formatName) return { errorText: 'That file type is not a font. Use woff2, woff, ttf or otf.' };
  const typedFamily = sanitizeFontFamilyName(readFieldValue(rootElement, 'data-db-custom-font-family'));
  const familyName = typedFamily || sanitizeFontFamilyName(String(fileObject.name).replace(/\.[a-z0-9]+$/i, ''));
  if (!familyName) return { errorText: 'Give the font a name, using letters and numbers.' };
  if (Number(fileObject.size) > maxFontBytes) {
    return {
      errorText: 'That font file is bigger than ' + formatByteSizeText(maxFontBytes) + '. Try a woff2 version of it.',
    };
  }
  return {
    errorText: '',
    fileObject,
    family: familyName,
    format: formatName,
    weight: clampCustomFontWeight(readFieldValue(rootElement, 'data-db-custom-font-weight')),
    style: readFieldValue(rootElement, 'data-db-custom-font-style') === 'italic' ? 'italic' : 'normal',
  };
};

export default readCustomFontFormValues;
