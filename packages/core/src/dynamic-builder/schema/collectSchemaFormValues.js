import setNestedSchemaValue from './setNestedSchemaValue.js';

const collectSchemaFormValues = (sectionElement) => {
  const formValues = {};
  if (!sectionElement) return formValues;
  sectionElement.querySelectorAll('[data-db-schema-field]').forEach((fieldElement) => {
    const fieldKey = fieldElement.dataset.dbSchemaField;
    if (!fieldKey) return;
    setNestedSchemaValue(formValues, fieldKey, String(fieldElement.value || '').trim());
  });
  return formValues;
};

export default collectSchemaFormValues;
