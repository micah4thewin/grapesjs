const formatDateValue = (rawValue) => {
  const parsedDate = new Date(rawValue);
  if (Number.isNaN(parsedDate.getTime())) return String(rawValue);
  return parsedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatNumberValue = (rawValue) => {
  const parsedNumber = typeof rawValue === 'number' ? rawValue : Number(String(rawValue).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsedNumber) ? parsedNumber.toLocaleString() : String(rawValue);
};

const formatBindingValue = (bindingValue, filterName) => {
  if (bindingValue == null) return '';
  let textValue = '';
  if (typeof bindingValue === 'object') {
    try {
      textValue = JSON.stringify(bindingValue);
    } catch {
      textValue = '';
    }
  } else {
    textValue = String(bindingValue);
  }
  const safeFilter = String(filterName || '').toLowerCase();
  if (safeFilter === 'upper') return textValue.toUpperCase();
  if (safeFilter === 'lower') return textValue.toLowerCase();
  if (safeFilter === 'date') return formatDateValue(bindingValue);
  if (safeFilter === 'number') return formatNumberValue(bindingValue);
  return textValue;
};

export default formatBindingValue;
