import applyBreadcrumbDefaultsOnAdd from './applyBreadcrumbDefaultsOnAdd.js';
import applyNavbarDefaultsOnAdd from './applyNavbarDefaultsOnAdd.js';
import ensureAnnouncementStorageKey from './ensureAnnouncementStorageKey.js';
import ensureContactAnchorTarget from './ensureContactAnchorTarget.js';
import getInteractiveInnerPartRules from './getInteractiveInnerPartRules.js';
import lockInteractiveInnerParts from './lockInteractiveInnerParts.js';
import resolveComponentPage from './resolveComponentPage.js';
import syncAccordionHeadingLevel from './syncAccordionHeadingLevel.js';
import syncAnnouncementLink from './syncAnnouncementLink.js';
import syncNavbarLogo from './syncNavbarLogo.js';

const findOwningInteractiveContainer = (component) => {
  const ruleRecord = getInteractiveInnerPartRules();
  let currentComponent = typeof component.parent === 'function' ? component.parent() : null;
  while (currentComponent) {
    if (ruleRecord[String(currentComponent.get('type') || '')]) return currentComponent;
    currentComponent = typeof currentComponent.parent === 'function' ? currentComponent.parent() : null;
  }
  return null;
};

const prepareInteractiveComponent = (editor, component, interactiveTextDefaults) => {
  const typeName = component && typeof component.get === 'function' ? String(component.get('type') || '') : '';
  if (!typeName) return false;
  if (getInteractiveInnerPartRules()[typeName]) lockInteractiveInnerParts(component);
  else if (!component.get('dbInnerPartLocked')) {
    const containerComponent = findOwningInteractiveContainer(component);
    if (containerComponent) lockInteractiveInnerParts(containerComponent);
  }
  if (typeName === 'db-announcement') {
    ensureAnnouncementStorageKey(component);
    syncAnnouncementLink(component);
  } else if (typeName === 'db-navbar') {
    applyNavbarDefaultsOnAdd(editor, component, interactiveTextDefaults);
    syncNavbarLogo(component);
  } else if (typeName === 'db-breadcrumb') {
    applyBreadcrumbDefaultsOnAdd(editor, component);
  } else if (typeName === 'db-accordion') {
    syncAccordionHeadingLevel(component);
  } else if (typeName === 'db-contact' || typeName === 'db-form') {
    ensureContactAnchorTarget(editor, resolveComponentPage(editor, component));
  } else return false;
  return true;
};

export default prepareInteractiveComponent;
