import ensureBreadcrumbRootStep from './ensureBreadcrumbRootStep.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import findChildByTagName from './findChildByTagName.js';
import normalizeBreadcrumbTrail from './normalizeBreadcrumbTrail.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const insertBreadcrumbStep = (breadcrumbComponent, labelText, hrefValue) => {
  const trailComponent = findChildByTagName(breadcrumbComponent, 'ol');
  if (!trailComponent) return null;
  ensureBreadcrumbRootStep(breadcrumbComponent, trailComponent);
  const insertIndex = Math.max(0, trailComponent.components().length - 1);
  const safeHref = sanitizeUrlValue(String(hrefValue || '').trim()) || '#';
  const stepMarkup = `<li><a href="${escapeHtmlText(safeHref)}">${escapeHtmlText(labelText || 'New step')}</a></li>`;
  const insertedComponents = trailComponent.append(stepMarkup, { at: insertIndex });
  normalizeBreadcrumbTrail(breadcrumbComponent);
  return insertedComponents[0] || null;
};

export default insertBreadcrumbStep;
