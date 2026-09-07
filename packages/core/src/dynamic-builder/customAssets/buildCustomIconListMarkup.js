import buildCustomIconSvgMarkup from './buildCustomIconSvgMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCustomIconListMarkup = (iconRecords) => {
  if (!iconRecords.length) {
    return '<p class="gjs-db-muted">No icons added yet. Your icons appear here and under My icons in the icon picker.</p>';
  }
  return iconRecords
    .map((iconRecord) => {
      const safeLabel = escapeHtmlText(iconRecord.label);
      return [
        '<div class="gjs-db-custom-card gjs-db-custom-card-icon">',
        `<span class="gjs-db-custom-icon-preview">${buildCustomIconSvgMarkup(iconRecord, { size: 28 })}</span>`,
        '<span class="gjs-db-custom-card-meta">',
        `<strong>${safeLabel}</strong>`,
        `<em>${escapeHtmlText(iconRecord.keywords || 'No search words yet')}</em>`,
        '</span>',
        '<button type="button" class="gjs-db-button gjs-db-button-danger"',
        ` data-db-custom-delete="icons" data-db-custom-id="${escapeHtmlText(iconRecord.iconName)}"`,
        ` aria-label="Delete ${safeLabel}">Delete</button>`,
        '</div>',
      ].join('');
    })
    .join('');
};

export default buildCustomIconListMarkup;
