import resolveLinkHref from './resolveLinkHref.js';

const trackingAttributeNames = ['data-db-link-page', 'data-db-link-anchor'];

const writeLinkRecord = (editor, component, linkRecord) => {
  if (!component || !component.addAttributes) return '#';
  const nextHref = resolveLinkHref(editor, linkRecord);
  const rawAttributes = component.get('attributes') || {};
  const additions = { href: nextHref };
  const removals = [];
  if (linkRecord.kind === 'page' && linkRecord.pageId) {
    additions['data-db-link-page'] = String(linkRecord.pageId);
    const anchorId = String(linkRecord.anchorId || '').trim();
    if (anchorId) additions['data-db-link-anchor'] = anchorId;
    else removals.push('data-db-link-anchor');
  } else removals.push(...trackingAttributeNames);
  const presentRemovals = removals.filter((attributeName) => attributeName in rawAttributes);
  const hasAdditionChange = Object.keys(additions).some((key) => String(rawAttributes[key] || '') !== additions[key]);
  if (hasAdditionChange) component.addAttributes(additions);
  if (presentRemovals.length && component.removeAttributes) component.removeAttributes(presentRemovals);
  return nextHref;
};

export default writeLinkRecord;
