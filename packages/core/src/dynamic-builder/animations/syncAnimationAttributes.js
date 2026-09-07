import getAnimationAttributeDefaults from './getAnimationAttributeDefaults.js';
import getAnimationAttributeNames from './getAnimationAttributeNames.js';

const syncAnimationAttributes = (component) => {
  if (!component || typeof component.getAttributes !== 'function') return;
  const attributesRecord = component.getAttributes();
  const effectValue = String(attributesRecord['data-db-aos'] || '');
  if (!effectValue) return;
  if (effectValue === 'none') {
    const presentNames = getAnimationAttributeNames().filter((attributeName) => attributeName in attributesRecord);
    if (presentNames.length && typeof component.removeAttributes === 'function') component.removeAttributes(presentNames);
    return;
  }
  const defaultsRecord = getAnimationAttributeDefaults();
  const missingRecord = {};
  Object.keys(defaultsRecord).forEach((attributeName) => {
    if (attributesRecord[attributeName] === undefined || attributesRecord[attributeName] === '') {
      missingRecord[attributeName] = defaultsRecord[attributeName];
    }
  });
  if (Object.keys(missingRecord).length) component.addAttributes(missingRecord);
};

export default syncAnimationAttributes;
