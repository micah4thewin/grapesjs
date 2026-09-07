import escapeHtmlText from '../support/escapeHtmlText.js';
import getDesignKitRecords from '../designTokens/getDesignKitRecords.js';
import getSiteSkeletonPagePresets from './getSiteSkeletonPagePresets.js';

const buildSiteWizardFormMarkup = (inputId, initialSiteName) => {
  const kitOptionsMarkup = getDesignKitRecords()
    .map(
      (kitRecord) =>
        `<option value="${escapeHtmlText(kitRecord.kitId)}">${escapeHtmlText(kitRecord.kitName)} \u2014 ${escapeHtmlText(kitRecord.kitHint)}</option>`,
    )
    .join('');
  const pageChoicesMarkup = getSiteSkeletonPagePresets()
    .map((presetRecord) =>
      [
        '<label class="gjs-db-wizard-choice">',
        `<input type="checkbox" class="gjs-db-field-input" data-db-wizard-page="${presetRecord.presetId}"`,
        `${presetRecord.checkedByDefault ? ' checked' : ''} />`,
        `<span>${escapeHtmlText(presetRecord.pageName)}</span>`,
        '</label>',
      ].join(''),
    )
    .join('');
  return [
    '<div class="gjs-db-form gjs-db-wizard-form">',
    '<p class="gjs-db-muted">Answer three quick questions and we will set up your pages, navigation and footer with working links. You can change everything later.</p>',
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${inputId}-name">Site name</label>`,
    `<input id="${inputId}-name" class="gjs-db-field-input" type="text" value="${escapeHtmlText(initialSiteName)}" placeholder="Acme Studio" autocomplete="organization" data-db-wizard-name />`,
    '<div class="gjs-db-field-help">Shown in the navigation, footer and browser tab titles.</div>',
    '</div>',
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${inputId}-kit">Look and feel</label>`,
    `<select id="${inputId}-kit" class="gjs-db-field-input" data-db-wizard-kit><option value="">Keep the current fonts and colours</option>${kitOptionsMarkup}</select>`,
    '</div>',
    '<fieldset class="gjs-db-field gjs-db-wizard-fieldset">',
    '<legend class="gjs-db-field-label">Pages to create</legend>',
    '<label class="gjs-db-wizard-choice"><input type="checkbox" class="gjs-db-field-input" checked disabled /><span>Home (index.html)</span></label>',
    pageChoicesMarkup,
    '</fieldset>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-wizard-skip>Skip for now</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-wizard-create>Create my site</button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildSiteWizardFormMarkup;
