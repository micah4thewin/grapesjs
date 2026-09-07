const syncPresetPropertyElement = (rootElement, value) => {
  if (!rootElement || !rootElement.querySelector) return;
  const selectElement = rootElement.querySelector('.gjs-db-preset-select');
  const customWrapper = rootElement.querySelector('.gjs-db-preset-custom');
  const inputElement = rootElement.querySelector('.gjs-db-preset-input');
  if (!selectElement || !customWrapper || !inputElement) return;
  const valueText = String(value == null ? '' : value).trim();
  const hasPreset = Array.from(selectElement.options).some(
    (option) => option.value === valueText && option.value !== '__custom',
  );
  if (hasPreset) {
    selectElement.value = valueText;
    customWrapper.hidden = true;
    inputElement.value = '';
    return;
  }
  selectElement.value = '__custom';
  customWrapper.hidden = false;
  const activeElement = rootElement.ownerDocument ? rootElement.ownerDocument.activeElement : null;
  if (inputElement !== activeElement) inputElement.value = valueText;
};

export default syncPresetPropertyElement;
