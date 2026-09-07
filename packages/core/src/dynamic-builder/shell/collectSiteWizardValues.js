import getSiteSkeletonPagePresets from './getSiteSkeletonPagePresets.js';

const collectSiteWizardValues = (formElement) => {
  const nameInput = formElement.querySelector('[data-db-wizard-name]');
  const kitSelect = formElement.querySelector('[data-db-wizard-kit]');
  const checkedPresetIds = [...formElement.querySelectorAll('[data-db-wizard-page]')]
    .filter((checkboxElement) => checkboxElement.checked)
    .map((checkboxElement) => checkboxElement.getAttribute('data-db-wizard-page'));
  return {
    siteName: nameInput ? String(nameInput.value || '').trim() : '',
    kitId: kitSelect ? String(kitSelect.value || '') : '',
    pagePresets: getSiteSkeletonPagePresets().filter(
      (presetRecord) => checkedPresetIds.indexOf(presetRecord.presetId) >= 0,
    ),
  };
};

export default collectSiteWizardValues;
