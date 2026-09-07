const readFieldText = (rootElement, attributeName) => {
  const fieldElement = rootElement.querySelector('[' + attributeName + ']');
  return fieldElement ? String(fieldElement.value || '').trim() : '';
};

const readSaveTemplateValues = (rootElement) => ({
  nameText: readFieldText(rootElement, 'data-db-template-name'),
  descriptionText: readFieldText(rootElement, 'data-db-template-description'),
  categoryId: readFieldText(rootElement, 'data-db-template-category-field') || 'saved',
});

export default readSaveTemplateValues;
