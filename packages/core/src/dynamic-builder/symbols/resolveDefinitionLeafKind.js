const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const headingTypes = ['db-heading'];
const textTypes = ['text', 'db-text', 'db-quote', 'db-callout'];
const buttonTypes = ['db-button', 'link', 'db-submit-button'];
const imageTypes = ['db-image', 'image', 'db-video', 'video', 'db-map', 'db-gallery', 'db-carousel'];

const resolveDefinitionLeafKind = (definitionRecord) => {
  const definitionType = String((definitionRecord && definitionRecord.type) || '');
  const tagName = String((definitionRecord && definitionRecord.tagName) || '').toLowerCase();
  if (headingTypes.indexOf(definitionType) >= 0 || headingTags.indexOf(tagName) >= 0) return 'heading';
  if (imageTypes.indexOf(definitionType) >= 0 || tagName === 'img') return 'image';
  if (buttonTypes.indexOf(definitionType) >= 0 || tagName === 'a' || tagName === 'button') return 'button';
  if (textTypes.indexOf(definitionType) >= 0 || tagName === 'p') return 'text';
  return '';
};

export default resolveDefinitionLeafKind;
