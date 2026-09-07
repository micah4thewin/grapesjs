import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildPresetPropertyElement = (ownerDocument, propertyProps, change) => {
  const targetDocument = ownerDocument || document;
  const optionRecords = Array.isArray(propertyProps && propertyProps.options) ? propertyProps.options : [];
  const optionsMarkup = optionRecords
    .map((option) => {
      const optionId = typeof option === 'string' ? option : option.id;
      const optionLabel = typeof option === 'string' ? option : option.label || option.id;
      return `<option value="${escapeHtmlText(optionId)}">${escapeHtmlText(optionLabel)}</option>`;
    })
    .join('');
  const wrapperElement = buildElementFromMarkup(
    targetDocument,
    [
      '<div class="gjs-db-preset-field">',
      '<div class="gjs-field gjs-select">',
      `<select class="gjs-db-preset-select" aria-label="Preset">${optionsMarkup}`,
      '<option value="__custom">Custom value…</option></select>',
      '<div class="gjs-sel-arrow"><div class="gjs-d-s-arrow"></div></div>',
      '</div>',
      '<div class="gjs-field gjs-db-preset-custom" hidden>',
      '<input class="gjs-db-preset-input" type="text" placeholder="Type a CSS value" aria-label="Custom value" />',
      '</div>',
      '</div>',
    ].join(''),
  );
  const selectElement = wrapperElement.querySelector('select');
  const customWrapper = wrapperElement.querySelector('.gjs-db-preset-custom');
  const inputElement = wrapperElement.querySelector('input');
  selectElement.addEventListener('change', (changeEvent) => {
    if (selectElement.value === '__custom') {
      customWrapper.hidden = false;
      inputElement.focus();
      return;
    }
    customWrapper.hidden = true;
    change({ event: changeEvent, value: selectElement.value });
  });
  inputElement.addEventListener('change', (changeEvent) => change({ event: changeEvent, value: inputElement.value.trim() }));
  inputElement.addEventListener('input', (inputEvent) =>
    change({ event: inputEvent, value: inputElement.value.trim(), partial: true }),
  );
  return wrapperElement;
};

export default buildPresetPropertyElement;
