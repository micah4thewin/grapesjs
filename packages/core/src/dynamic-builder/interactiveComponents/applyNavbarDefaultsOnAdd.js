import buildNavbarLinksFromPages from './buildNavbarLinksFromPages.js';
import ensureContactAnchorTarget from './ensureContactAnchorTarget.js';
import findComponentsByAttribute from './findComponentsByAttribute.js';
import hasDefaultNavbarLinks from './hasDefaultNavbarLinks.js';
import listPagePathEntries from '../support/listPagePathEntries.js';
import resolveComponentPage from './resolveComponentPage.js';
import resolveNavbarCtaHref from './resolveNavbarCtaHref.js';

const applyNavbarDefaultsOnAdd = (editor, navbarComponent, interactiveTextDefaults) => {
  if (!navbarComponent || navbarComponent.get('dbNavbarPrepared')) return false;
  navbarComponent.set('dbNavbarPrepared', true, { avoidStore: true });
  const attributeRecord = navbarComponent.getAttributes() || {};
  const shouldFollowPages =
    listPagePathEntries(editor).length > 1 && hasDefaultNavbarLinks(navbarComponent, interactiveTextDefaults);
  if (shouldFollowPages) {
    buildNavbarLinksFromPages(editor, navbarComponent);
    navbarComponent.addAttributes({ 'data-db-menu-auto': 'true' });
  } else if (attributeRecord['data-db-menu-auto'] === undefined) {
    navbarComponent.addAttributes({ 'data-db-menu-auto': 'false' });
  }
  const ctaComponent = findComponentsByAttribute(navbarComponent, 'data-db-navbar-cta')[0];
  if (ctaComponent && String((ctaComponent.getAttributes() || {}).href || '') === '#contact') {
    ctaComponent.addAttributes({ href: resolveNavbarCtaHref(editor) });
  }
  ensureContactAnchorTarget(editor, resolveComponentPage(editor, navbarComponent));
  return true;
};

export default applyNavbarDefaultsOnAdd;
