import buildNavbarLinkItemMarkup from './buildNavbarLinkItemMarkup.js';
import findComponentsByClassName from './findComponentsByClassName.js';
import listPagePathEntries from '../support/listPagePathEntries.js';
import lockInteractiveInnerParts from './lockInteractiveInnerParts.js';
import resolvePageEntryName from './resolvePageEntryName.js';
import resolvePageLinkHref from './resolvePageLinkHref.js';

const buildNavbarLinksFromPages = (editor, navbarComponent) => {
  const menuComponent = findComponentsByClassName(navbarComponent, 'db-navbar-links')[0];
  if (!menuComponent) return 0;
  const pathEntries = listPagePathEntries(editor);
  const menuMarkup = pathEntries
    .map((pathEntry) => buildNavbarLinkItemMarkup(resolvePageEntryName(pathEntry), resolvePageLinkHref(pathEntry)))
    .join('');
  menuComponent.components(menuMarkup);
  lockInteractiveInnerParts(navbarComponent);
  return pathEntries.length;
};

export default buildNavbarLinksFromPages;
