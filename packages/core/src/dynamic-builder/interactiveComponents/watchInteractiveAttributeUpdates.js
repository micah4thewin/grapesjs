import applyDefaultTabSelection from './applyDefaultTabSelection.js';
import buildBreadcrumbFromPages from './buildBreadcrumbFromPages.js';
import buildNavbarLinksFromPages from './buildNavbarLinksFromPages.js';
import resolveComponentPage from './resolveComponentPage.js';
import syncAccordionHeadingLevel from './syncAccordionHeadingLevel.js';
import syncAnnouncementLink from './syncAnnouncementLink.js';
import syncNavbarLogo from './syncNavbarLogo.js';

const readType = (component) => (component && typeof component.get === 'function' ? String(component.get('type')) : '');
const readAttribute = (component, attributeName) => String((component.getAttributes() || {})[attributeName] || '');

const findOwningNavbar = (component) => {
  let currentComponent = component;
  while (currentComponent && readType(currentComponent) !== 'db-navbar') {
    currentComponent = typeof currentComponent.parent === 'function' ? currentComponent.parent() : null;
  }
  return currentComponent || null;
};

const watchInteractiveAttributeUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-heading-level', (component) => {
    if (readType(component) === 'db-accordion') syncAccordionHeadingLevel(component);
  });
  editor.on('component:update:attributes:aria-selected', (component) => {
    if (readType(component) === 'db-tab-button' && readAttribute(component, 'aria-selected') === 'true') {
      applyDefaultTabSelection(component);
    }
  });
  editor.on('component:update:attributes:data-db-logo', (component) => {
    if (readType(component) === 'db-navbar') syncNavbarLogo(component);
  });
  editor.on('component:update:attributes:src', (component) => {
    if (!component.getClasses || component.getClasses().indexOf('db-navbar-logo') < 0) return;
    const navbarComponent = findOwningNavbar(component);
    const logoSource = readAttribute(component, 'src');
    if (navbarComponent && readAttribute(navbarComponent, 'data-db-logo') !== logoSource) {
      navbarComponent.addAttributes({ 'data-db-logo': logoSource });
    }
  });
  editor.on('component:update:attributes:data-db-scroll', (component) => {
    if (readType(component) !== 'db-navbar' || readAttribute(component, 'data-db-scroll') === 'none') return;
    if (readAttribute(component, 'data-db-sticky') !== 'true') component.addAttributes({ 'data-db-sticky': 'true' });
  });
  editor.on('component:update:attributes:data-db-menu-auto', (component) => {
    if (readType(component) === 'db-navbar' && readAttribute(component, 'data-db-menu-auto') === 'true') {
      buildNavbarLinksFromPages(editor, component);
    }
  });
  editor.on('component:update:attributes:data-db-auto', (component) => {
    if (readType(component) === 'db-breadcrumb' && readAttribute(component, 'data-db-auto') === 'true') {
      buildBreadcrumbFromPages(editor, component, resolveComponentPage(editor, component));
    }
  });
  ['data-db-link-text', 'data-db-link-href'].forEach((attributeName) =>
    editor.on('component:update:attributes:' + attributeName, (component) => {
      if (readType(component) === 'db-announcement') syncAnnouncementLink(component);
    }),
  );
};

export default watchInteractiveAttributeUpdates;
