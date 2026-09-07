import buildCodeFieldMarkup from '../codeEditor/buildCodeFieldMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getCustomCodeSlotRecords from './getCustomCodeSlotRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildTabButtonMarkup = (slotRecord, slotIndex, idToken) =>
  [
    '<button type="button" class="gjs-db-code-tab" role="tab" data-db-code-tab="' + slotRecord.name + '"',
    ' id="' + idToken + '-tab-' + slotRecord.name + '"',
    ' aria-controls="' + idToken + '-panel-' + slotRecord.name + '"',
    ' aria-selected="' + (slotIndex === 0 ? 'true' : 'false') + '"',
    ' tabindex="' + (slotIndex === 0 ? '0' : '-1') + '">',
    escapeHtmlText(slotRecord.label),
    '</button>',
  ].join('');

const buildTabPanelMarkup = (slotRecord, slotIndex, idToken) =>
  [
    '<div class="gjs-db-code-panel" role="tabpanel" data-db-code-panel="' + slotRecord.name + '"',
    ' id="' + idToken + '-panel-' + slotRecord.name + '"',
    ' aria-labelledby="' + idToken + '-tab-' + slotRecord.name + '"',
    slotIndex === 0 ? '>' : ' hidden>',
    buildCodeFieldMarkup({
      name: slotRecord.name,
      label: slotRecord.label,
      language: slotRecord.language,
      helpText: slotRecord.helpText,
    }),
    '<p class="gjs-db-custom-code-script-note" data-db-script-note="' + slotRecord.name + '" hidden>',
    'This slot contains script tags. They will be removed on save while Allow script tags is off.',
    '</p>',
    '</div>',
  ].join('');

const buildCustomCodeModalMarkup = (customCodeSettings, idToken) => {
  const slotRecords = getCustomCodeSlotRecords();
  const warningText =
    'Injected code runs with full access to your published pages and your visitors. ' +
    'Only paste code you trust. Script tags are stripped from every slot unless you allow scripts below.';
  const allowlistValue = (customCodeSettings.scriptOriginAllowlist || []).join('\n');
  const allowScripts = customCodeSettings.allowScripts === true;
  return [
    '<form class="gjs-db-form gjs-db-custom-code-form">',
    '<p class="gjs-db-custom-code-warning">',
    getIconMarkup('warning', { size: 16 }),
    '<span>' + escapeHtmlText(warningText) + '</span>',
    '</p>',
    '<div class="gjs-db-code-tabs" role="tablist" aria-label="Code slots">',
    slotRecords.map((slotRecord, slotIndex) => buildTabButtonMarkup(slotRecord, slotIndex, idToken)).join(''),
    '</div>',
    slotRecords.map((slotRecord, slotIndex) => buildTabPanelMarkup(slotRecord, slotIndex, idToken)).join(''),
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label gjs-db-custom-code-toggle">',
    '<input type="checkbox" data-db-allow-scripts' + (allowScripts ? ' checked' : '') + '>',
    '<span>Allow script tags in exports</span>',
    '</label>',
    '<span class="gjs-db-field-help">',
    'When off (recommended), script tags are removed on save and custom script blocks stay out of exports. ',
    'When on, the slots are stored as written and exports may run scripts.',
    '</span>',
    '</div>',
    '<div class="gjs-db-field" data-db-origins-field>',
    '<label class="gjs-db-field-label" for="' + idToken + '-origins">Only load scripts from these sites</label>',
    '<textarea class="gjs-db-field-input" id="' +
      idToken +
      '-origins" data-db-script-origins rows="3"' +
      (allowScripts ? '' : ' disabled') +
      '>',
    escapeHtmlText(allowlistValue),
    '</textarea>',
    '<span class="gjs-db-field-help">One site per line, for example https://cdn.example.com. ',
    'Leave empty to allow scripts from any site. Only used while script tags are allowed.</span>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-custom-code-cancel>Cancel</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-custom-code-save>',
    'Save custom code',
    '</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildCustomCodeModalMarkup;
