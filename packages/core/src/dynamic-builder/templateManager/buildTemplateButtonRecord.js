const buildTemplateButtonRecord = (labelText, linkHref, variantName) => ({
  type: 'db-button',
  classes: ['db-button'],
  attributes: { href: linkHref, 'data-db-variant': variantName || 'primary' },
  components: labelText,
});

export default buildTemplateButtonRecord;
