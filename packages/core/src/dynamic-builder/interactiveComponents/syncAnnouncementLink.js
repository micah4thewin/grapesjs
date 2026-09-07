import escapeHtmlText from '../support/escapeHtmlText.js';
import findComponentsByClassName from './findComponentsByClassName.js';
import lockInteractiveInnerParts from './lockInteractiveInnerParts.js';
import readComponentTextContent from './readComponentTextContent.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import writeComponentTextContent from './writeComponentTextContent.js';

const syncAnnouncementLink = (announcementComponent) => {
  if (!announcementComponent || typeof announcementComponent.getAttributes !== 'function') return;
  const attributeRecord = announcementComponent.getAttributes() || {};
  const linkText = String(attributeRecord['data-db-link-text'] || '').trim();
  const linkHref = sanitizeUrlValue(attributeRecord['data-db-link-href']);
  const existingLink = findComponentsByClassName(announcementComponent, 'db-announcement-link')[0];
  if (!linkText || !linkHref) {
    if (existingLink) existingLink.remove();
    return;
  }
  if (existingLink) {
    if ((existingLink.getAttributes() || {}).href !== linkHref) existingLink.addAttributes({ href: linkHref });
    if (readComponentTextContent(existingLink) !== linkText) writeComponentTextContent(existingLink, linkText);
    return;
  }
  const textComponent = findComponentsByClassName(announcementComponent, 'db-announcement-text')[0];
  const insertIndex = textComponent ? textComponent.index() + 1 : 0;
  announcementComponent.append(
    `<a class="db-announcement-link" href="${escapeHtmlText(linkHref)}">${escapeHtmlText(linkText)}</a>`,
    { at: insertIndex },
  );
  lockInteractiveInnerParts(announcementComponent);
};

export default syncAnnouncementLink;
