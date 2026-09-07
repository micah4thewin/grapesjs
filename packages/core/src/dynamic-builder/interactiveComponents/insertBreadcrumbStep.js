import escapeHtmlText from '../support/escapeHtmlText.js';
import findChildByTagName from './findChildByTagName.js';
import normalizeBreadcrumbTrail from './normalizeBreadcrumbTrail.js';

const insertBreadcrumbStep = (breadcrumbComponent, labelText, hrefValue) => {
  const trailComponent = findChildByTagName(breadcrumbComponent, 'ol');
  if (!trailComponent) return null;
  const insertIndex = Math.max(0, trailComponent.components().length - 1);
  const stepMarkup = `<li><a href="${escapeHtmlText(hrefValue || '#')}">${escapeHtmlText(labelText || 'New step')}</a></li>`;
  const insertedComponents = trailComponent.append(stepMarkup, { at: insertIndex });
  normalizeBreadcrumbTrail(breadcrumbComponent);
  return insertedComponents[0] || null;
};

export default insertBreadcrumbStep;
