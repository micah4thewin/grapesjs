import buildSiteCardRowsMarkup from './buildSiteCardRowsMarkup.js';
import describeSiteMetaText from './describeSiteMetaText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCardActionMarkup = (actionName, labelText, extraClassName) =>
  '<button type="button" class="gjs-db-button' +
  (extraClassName ? ' ' + extraClassName : '') +
  '" data-db-site-action="' +
  actionName +
  '">' +
  labelText +
  '</button>';

const buildSiteCardMarkup = (siteRecord, currentSiteId, nowValue) => {
  const isCurrentSite = siteRecord.id === currentSiteId;
  const safeName = escapeHtmlText(siteRecord.name);
  const currentBadge = isCurrentSite ? ' <span class="gjs-db-badge gjs-db-badge-success">Open now</span>' : '';
  const descriptionMarkup = siteRecord.description
    ? '<span class="gjs-db-muted">' + escapeHtmlText(siteRecord.description) + '</span>'
    : '';
  return [
    '<li class="gjs-db-list-item gjs-db-site-card' + (isCurrentSite ? ' gjs-db-site-card-current' : '') + '"',
    ' data-db-site-id="' + escapeHtmlText(siteRecord.id) + '">',
    '<div class="gjs-db-site-summary">',
    '<span class="gjs-db-site-name">' + safeName + currentBadge + '</span>',
    '<span class="gjs-db-muted">' + escapeHtmlText(describeSiteMetaText(siteRecord, nowValue)) + '</span>',
    descriptionMarkup,
    '</div>',
    '<div class="gjs-db-button-row gjs-db-site-actions">',
    buildCardActionMarkup('open', isCurrentSite ? 'Keep editing' : 'Open', 'gjs-db-button-primary'),
    buildCardActionMarkup('rename', 'Rename', ''),
    buildCardActionMarkup('duplicate', 'Duplicate', ''),
    buildCardActionMarkup('export', 'Export', ''),
    buildCardActionMarkup('delete', 'Delete', 'gjs-db-button-danger'),
    '</div>',
    buildSiteCardRowsMarkup(siteRecord),
    '</li>',
  ].join('');
};

export default buildSiteCardMarkup;
