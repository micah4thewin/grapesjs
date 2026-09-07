const legacyClassRecord = {
  'db-text': ['db-text-lead', 'db-text-small', 'db-text-caption', 'db-eyebrow'],
  'db-button': ['db-button-full-mobile'],
};

const stripLegacyContentClasses = (component) => {
  if (!component || !component.get || !component.getClasses) return;
  const legacyClasses = legacyClassRecord[String(component.get('type') || '')];
  if (!legacyClasses) return;
  const currentClasses = component.getClasses();
  const foundClasses = legacyClasses.filter((className) => currentClasses.indexOf(className) >= 0);
  if (!foundClasses.length) return;
  if (foundClasses.indexOf('db-eyebrow') >= 0) component.addAttributes({ 'data-db-variant': 'eyebrow' });
  component.removeClass(foundClasses);
};

export default stripLegacyContentClasses;
