import dropComponentAttributes from '../support/dropComponentAttributes.js';

const migrateLegacyColumnsAttributes = (component) => {
  if (!component || !component.is || !component.is('db-columns')) return;
  const attributeRecord = component.getAttributes();
  const hasLegacyClass = component.getClasses().indexOf('db-stack-mobile') >= 0;
  const hasLegacyAttribute = 'data-db-stack-mobile' in attributeRecord || 'data-db-reverse-mobile' in attributeRecord;
  if (!hasLegacyClass && !hasLegacyAttribute) return;
  const stacksOnMobile = String(attributeRecord['data-db-stack-mobile']) !== 'false';
  const reversesOnMobile = String(attributeRecord['data-db-reverse-mobile']) === 'true';
  const mobileMode = !stacksOnMobile ? 'side-by-side' : reversesOnMobile ? 'stack-reverse' : 'stack';
  if (hasLegacyClass) component.removeClass('db-stack-mobile');
  dropComponentAttributes(component, ['data-db-stack-mobile', 'data-db-reverse-mobile']);
  if (!attributeRecord['data-db-mobile']) component.addAttributes({ 'data-db-mobile': mobileMode });
};

export default migrateLegacyColumnsAttributes;
