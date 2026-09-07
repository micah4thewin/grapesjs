import resolveBindingPath from './resolveBindingPath.js';

const filterSourceItems = (sourceItems, filterField, filterValue) => {
  const safeItems = Array.isArray(sourceItems) ? sourceItems : [];
  const fieldText = String(filterField == null ? '' : filterField).trim();
  if (!fieldText) return safeItems;
  const expectedText = String(filterValue == null ? '' : filterValue).trim();
  return safeItems.filter((sourceItem) => {
    const fieldValue = resolveBindingPath(sourceItem, fieldText);
    if (!expectedText) return Array.isArray(fieldValue) ? fieldValue.length > 0 : Boolean(fieldValue);
    return (
      String(fieldValue == null ? '' : fieldValue)
        .trim()
        .toLowerCase() === expectedText.toLowerCase()
    );
  });
};

export default filterSourceItems;
