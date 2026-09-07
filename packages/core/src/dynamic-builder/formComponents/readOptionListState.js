const readOptionListState = (wrapperElement) => {
  const rowElements = [...wrapperElement.querySelectorAll('[data-db-option-row]')];
  let selectedValue = '';
  const optionEntries = rowElements.map((rowElement) => {
    const labelInput = rowElement.querySelector('[data-db-option-field="optionLabel"]');
    const valueInput = rowElement.querySelector('[data-db-option-field="optionValue"]');
    const defaultInput = rowElement.querySelector('[data-db-option-default]');
    const labelText = String((labelInput && labelInput.value) || '').trim();
    const valueText = String((valueInput && valueInput.value) || '').trim() || labelText;
    if (defaultInput && defaultInput.checked) selectedValue = valueText;
    return { optionLabel: labelText || valueText, optionValue: valueText };
  });
  return { optionEntries, selectedValue };
};

export default readOptionListState;
