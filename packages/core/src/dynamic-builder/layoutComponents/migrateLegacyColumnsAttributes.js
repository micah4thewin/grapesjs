import dropComponentAttributes from '../support/dropComponentAttributes.js';
import resolveLegacyMobileMode from './resolveLegacyMobileMode.js';

const migrateLegacyColumnsAttributes = (component) => {
  if (!component || !component.is || !component.is('db-columns')) return;
  const attributeRecord = component.getAttributes();
  const hasLegacyClass = component.getClasses().indexOf('db-stack-mobile') >= 0;
  const hasLegacyAttribute = 'data-db-stack-mobile' in attributeRecord || 'data-db-reverse-mobile' in attributeRecord;
  if (!hasLegacyClass && !hasLegacyAttribute) return;
  const mobileMode = resolveLegacyMobileMode(attributeRecord);
  if (hasLegacyClass) component.removeClass('db-stack-mobile');
  dropComponentAttributes(component, ['data-db-stack-mobile', 'data-db-reverse-mobile']);
  component.addAttributes({ 'data-db-mobile': mobileMode });
};

export default migrateLegacyColumnsAttributes;
