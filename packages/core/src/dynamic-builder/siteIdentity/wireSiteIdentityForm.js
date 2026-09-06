import applySiteIdentityRecord from './applySiteIdentityRecord.js';
import collectSiteIdentityFormValues from './collectSiteIdentityFormValues.js';
import extractPaletteFromLogo from './extractPaletteFromLogo.js';
import pickLogoFromAssets from './pickLogoFromAssets.js';
import refreshPalettePreview from './refreshPalettePreview.js';
import showToastNotice from '../support/showToastNotice.js';

const wireSiteIdentityForm = (editor, designTokenOptions, formElement) => {
  formElement.addEventListener('input', () => refreshPalettePreview(formElement));
  formElement.addEventListener('click', (clickEvent) => {
    const target = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!target) return;
    const moodButton = target.closest('[data-db-identity-mood]');
    if (moodButton) {
      formElement
        .querySelectorAll('[data-db-identity-mood]')
        .forEach((chipElement) => chipElement.classList.toggle('gjs-db-chip-active', chipElement === moodButton));
      refreshPalettePreview(formElement);
      return;
    }
    if (target.closest('[data-db-identity-pick-logo]'))
      pickLogoFromAssets(editor, formElement, () => refreshPalettePreview(formElement));
    if (target.closest('[data-db-identity-extract]'))
      extractPaletteFromLogo(editor, formElement, () => refreshPalettePreview(formElement));
  });
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const identityRecord = collectSiteIdentityFormValues(formElement);
    if (!identityRecord.siteName) {
      showToastNotice(editor, 'Give the site a name first.', { kind: 'warning' });
      return;
    }
    const replacedCount = applySiteIdentityRecord(editor, designTokenOptions, identityRecord);
    editor.Modal.close();
    const suffix = replacedCount ? ` and updated ${replacedCount} place${replacedCount === 1 ? '' : 's'}` : '';
    showToastNotice(editor, `Site identity applied${suffix}`, { kind: 'success' });
  });
};

export default wireSiteIdentityForm;
