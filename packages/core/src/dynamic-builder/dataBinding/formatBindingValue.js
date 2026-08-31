const formatBindingValue = (bindingValue) => {
  if (bindingValue == null) return '';
  if (typeof bindingValue === 'object') {
    try {
      return JSON.stringify(bindingValue);
    } catch {
      return '';
    }
  }
  return String(bindingValue);
};

export default formatBindingValue;
