const focusSeoField = (rootElement, fieldKey) => {
  const fieldElement = fieldKey ? rootElement.querySelector('[data-db-seo-field="' + fieldKey + '"]') : null;
  if (!fieldElement || !fieldElement.focus) return;
  setTimeout(() => fieldElement.focus(), 60);
};

export default focusSeoField;
