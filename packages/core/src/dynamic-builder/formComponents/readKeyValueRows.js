const readKeyValueRows = (sectionElement) => {
  const rowRecord = {};
  if (!sectionElement) return rowRecord;
  sectionElement.querySelectorAll('[data-db-kv-row]').forEach((rowElement) => {
    const keyInput = rowElement.querySelector('[data-db-kv-key]');
    const valueInput = rowElement.querySelector('[data-db-kv-value]');
    const keyName = String((keyInput && keyInput.value) || '').trim();
    if (!keyName) return;
    rowRecord[keyName] = String((valueInput && valueInput.value) || '').trim();
  });
  return rowRecord;
};

export default readKeyValueRows;
