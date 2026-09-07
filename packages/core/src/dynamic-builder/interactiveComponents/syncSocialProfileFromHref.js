import applySocialProfileUrl from './applySocialProfileUrl.js';
import readSocialProfileRecords from './readSocialProfileRecords.js';

const findOwningSocialLinks = (component) => {
  let currentComponent = component;
  while (currentComponent && String(currentComponent.get('type') || '') !== 'db-social-links') {
    currentComponent = typeof currentComponent.parent === 'function' ? currentComponent.parent() : null;
  }
  return currentComponent || null;
};

const syncSocialProfileFromHref = (linkComponent) => {
  const rootComponent = findOwningSocialLinks(linkComponent);
  if (!rootComponent) return false;
  const profileRecords = readSocialProfileRecords(rootComponent);
  const itemIndex = profileRecords.findIndex((profileRecord) => profileRecord.linkComponent === linkComponent);
  if (itemIndex < 0) return false;
  return applySocialProfileUrl(rootComponent, itemIndex, (linkComponent.getAttributes() || {}).href);
};

export default syncSocialProfileFromHref;
