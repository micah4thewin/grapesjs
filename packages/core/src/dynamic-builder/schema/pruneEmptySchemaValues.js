const pruneEmptySchemaValues = (candidateValue) => {
  if (Array.isArray(candidateValue)) {
    const prunedItems = candidateValue
      .map((itemValue) => pruneEmptySchemaValues(itemValue))
      .filter((itemValue) => itemValue !== undefined);
    return prunedItems.length ? prunedItems : undefined;
  }
  if (candidateValue && typeof candidateValue === 'object') {
    const prunedRecord = {};
    Object.entries(candidateValue).forEach(([recordKey, recordValue]) => {
      const prunedValue = pruneEmptySchemaValues(recordValue);
      if (prunedValue !== undefined) prunedRecord[recordKey] = prunedValue;
    });
    const hasOwnContent = Object.keys(prunedRecord).some((recordKey) => recordKey[0] !== '@');
    return hasOwnContent ? prunedRecord : undefined;
  }
  if (typeof candidateValue === 'number' || typeof candidateValue === 'boolean') return candidateValue;
  const textValue = String(candidateValue == null ? '' : candidateValue).trim();
  return textValue || undefined;
};

export default pruneEmptySchemaValues;
