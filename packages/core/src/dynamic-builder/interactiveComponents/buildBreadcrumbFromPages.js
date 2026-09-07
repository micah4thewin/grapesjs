import escapeHtmlText from '../support/escapeHtmlText.js';
import findChildByTagName from './findChildByTagName.js';
import listPagePathEntries from '../support/listPagePathEntries.js';
import lockInteractiveInnerParts from './lockInteractiveInnerParts.js';
import resolvePageEntryName from './resolvePageEntryName.js';
import resolvePageLinkHref from './resolvePageLinkHref.js';

const buildBreadcrumbFromPages = (editor, breadcrumbComponent, sitePage) => {
  const trailComponent = findChildByTagName(breadcrumbComponent, 'ol');
  if (!trailComponent) return 0;
  const pathEntries = listPagePathEntries(editor);
  const mainEntry = pathEntries.find((pathEntry) => pathEntry.isMainPage) || pathEntries[0] || null;
  const pageId = sitePage && typeof sitePage.getId === 'function' ? String(sitePage.getId()) : '';
  const currentEntry = pathEntries.find((pathEntry) => pathEntry.pageId === pageId) || null;
  const homeName = escapeHtmlText(resolvePageEntryName(mainEntry));
  const trailMarkup =
    !currentEntry || currentEntry.isMainPage
      ? `<li aria-current="page">${homeName}</li>`
      : `<li><a href="${escapeHtmlText(resolvePageLinkHref(mainEntry))}">${homeName}</a></li>` +
        `<li aria-current="page">${escapeHtmlText(resolvePageEntryName(currentEntry))}</li>`;
  trailComponent.components(trailMarkup);
  lockInteractiveInnerParts(breadcrumbComponent);
  return trailComponent.components().length;
};

export default buildBreadcrumbFromPages;
