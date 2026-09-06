import extractDominantColors from './extractDominantColors.js';
import readImageElementFromSource from './readImageElementFromSource.js';
import showToastNotice from '../support/showToastNotice.js';

const extractPaletteFromLogo = (editor, formElement, afterExtract) => {
  const sourceInput = formElement.querySelector('[data-db-identity-logo-src]');
  const logoSource = sourceInput ? String(sourceInput.value || '') : '';
  if (!logoSource) {
    showToastNotice(editor, 'Choose a logo first, then extract its colours.', { kind: 'warning' });
    return;
  }
  readImageElementFromSource(logoSource)
    .then((imageElement) => {
      const dominantColors = extractDominantColors(imageElement, 4);
      if (!dominantColors.length) {
        showToastNotice(editor, 'That logo is mostly black, white or grey, so keep your own brand colour.', {
          kind: 'warning',
        });
        return;
      }
      const brandInput = formElement.querySelector('[data-db-identity-brand]');
      if (brandInput) brandInput.value = dominantColors[0];
      afterExtract(dominantColors);
      showToastNotice(editor, 'Brand colour picked from your logo', { kind: 'success' });
    })
    .catch(() => showToastNotice(editor, 'The logo image could not be read for colours.', { kind: 'error' }));
};

export default extractPaletteFromLogo;
