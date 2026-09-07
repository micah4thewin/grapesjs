import toSlugText from '../support/toSlugText.js';

const buildUserTemplateRecord = (formValues, kindName, contentRecords) => ({
  templateId: 'db-user-' + (toSlugText(formValues.nameText) || 'template') + '-' + Date.now(),
  name: formValues.nameText,
  description: formValues.descriptionText,
  categoryId: formValues.categoryId || 'saved',
  kind: kindName,
  source: 'user',
  createdAt: Date.now(),
  content: contentRecords,
});

export default buildUserTemplateRecord;
