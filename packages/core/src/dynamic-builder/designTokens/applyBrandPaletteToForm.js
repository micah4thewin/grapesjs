import formatColorAsHex from './formatColorAsHex.js';
import generateBrandPalette from '../siteIdentity/generateBrandPalette.js';
import getSiteIdentityRecord from '../siteIdentity/getSiteIdentityRecord.js';

const applyBrandPaletteToForm = (editor, formElement) => {
  const identityRecord = getSiteIdentityRecord(editor);
  const findColorInput = (tokenName) =>
    formElement.querySelector(`[data-db-token-group="color"][data-db-token-name="${tokenName}"]`);
  const brandInput = findColorInput('brand');
  const brandHex = formatColorAsHex(brandInput ? brandInput.value : '', identityRecord.brandColor);
  const paletteRecord = generateBrandPalette(brandHex, identityRecord.moodId);
  Object.keys(paletteRecord).forEach((tokenName) => {
    const inputElement = findColorInput(tokenName);
    if (inputElement) inputElement.value = paletteRecord[tokenName];
  });
  return paletteRecord;
};

export default applyBrandPaletteToForm;
