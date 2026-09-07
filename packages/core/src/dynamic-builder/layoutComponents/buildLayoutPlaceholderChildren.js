import getLayoutPlaceholderCopy from './getLayoutPlaceholderCopy.js';

const buildPlaceholderRecord = (componentType, componentName, copyText, extraAttributes = {}) => ({
  type: componentType,
  name: componentName,
  attributes: { 'data-db-placeholder': 'true', ...extraAttributes },
  components: copyText,
});

const buildLayoutPlaceholderChildren = (placementKind) => {
  const placeholderCopy = getLayoutPlaceholderCopy();
  if (placementKind === 'column') {
    return [buildPlaceholderRecord('db-text', 'Column text', placeholderCopy.columnText)];
  }
  return [
    buildPlaceholderRecord('db-heading', 'Section headline', placeholderCopy.sectionHeadline, { 'data-db-level': '2' }),
    buildPlaceholderRecord('db-text', 'Section text', placeholderCopy.sectionText),
  ];
};

export default buildLayoutPlaceholderChildren;
