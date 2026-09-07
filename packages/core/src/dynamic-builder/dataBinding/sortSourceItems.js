import resolveBindingPath from './resolveBindingPath.js';

const compareFieldValues = (firstValue, secondValue) => {
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);
  const bothNumeric =
    firstValue !== '' && secondValue !== '' && Number.isFinite(firstNumber) && Number.isFinite(secondNumber);
  if (bothNumeric) return firstNumber - secondNumber;
  return String(firstValue).localeCompare(String(secondValue), undefined, { numeric: true, sensitivity: 'base' });
};

const sortSourceItems = (sourceItems, sortField, sortDirection) => {
  const safeItems = Array.isArray(sourceItems) ? sourceItems : [];
  const fieldText = String(sortField == null ? '' : sortField).trim();
  if (!fieldText) return safeItems;
  const directionSign = sortDirection === 'desc' ? -1 : 1;
  return safeItems
    .map((sourceItem, originalIndex) => ({ sourceItem, originalIndex }))
    .sort((firstEntry, secondEntry) => {
      const firstValue = resolveBindingPath(firstEntry.sourceItem, fieldText);
      const secondValue = resolveBindingPath(secondEntry.sourceItem, fieldText);
      const comparison = compareFieldValues(
        firstValue == null ? '' : firstValue,
        secondValue == null ? '' : secondValue,
      );
      return comparison !== 0 ? comparison * directionSign : firstEntry.originalIndex - secondEntry.originalIndex;
    })
    .map((sortedEntry) => sortedEntry.sourceItem);
};

export default sortSourceItems;
