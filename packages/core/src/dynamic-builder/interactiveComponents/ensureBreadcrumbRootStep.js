import escapeHtmlText from '../support/escapeHtmlText.js';
import listPagePathEntries from '../support/listPagePathEntries.js';
import resolveEditorFromComponent from './resolveEditorFromComponent.js';
import resolvePageEntryName from './resolvePageEntryName.js';
import resolvePageLinkHref from './resolvePageLinkHref.js';

const resolveMainPageEntry = (breadcrumbComponent) => {
  const editor = resolveEditorFromComponent(breadcrumbComponent);
  if (!editor || !editor.Pages) return null;
  return listPagePathEntries(editor).find((pathEntry) => pathEntry.isMainPage) || null;
};

const ensureBreadcrumbRootStep = (breadcrumbComponent, trailComponent) => {
  if (!trailComponent || typeof trailComponent.components !== 'function') return null;
  if (trailComponent.components().length !== 1) return null;
  const mainEntry = resolveMainPageEntry(breadcrumbComponent);
  const labelText = mainEntry ? resolvePageEntryName(mainEntry) : 'Home';
  const rootMarkup = `<li><a href="${escapeHtmlText(resolvePageLinkHref(mainEntry))}">${escapeHtmlText(labelText)}</a></li>`;
  return trailComponent.append(rootMarkup, { at: 0 })[0] || null;
};

export default ensureBreadcrumbRootStep;
