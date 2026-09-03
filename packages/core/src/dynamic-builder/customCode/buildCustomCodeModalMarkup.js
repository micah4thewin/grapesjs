import buildCodeFieldMarkup from '../codeEditor/buildCodeFieldMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getCustomCodeSlotRecords from './getCustomCodeSlotRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildTabButtonMarkup = (slotRecord, slotIndex) =>
  [
    '<button type="button" class="gjs-db-code-tab" role="tab" data-db-code-tab="' + slotRecord.name + '"',
    ' id="gjs-db-code-tab-' + slotRecord.name + '"',
    ' aria-controls="gjs-db-code-panel-' + slotRecord.name + '"',
    ' aria-selected="' + (slotIndex === 0 ? 'true' : 'false') + '"',
    ' tabindex="' + (slotIndex === 0 ? '0' : '-1') + '">',
    escapeHtmlText(slotRecord.label),
    '</button>',
  ].join('');

const buildTabPanelMarkup = (slotRecord, slotIndex) =>
  [
    '<div class="gjs-db-code-panel" role="tabpanel" data-db-code-panel="' + slotRecord.name + '"',
    ' id="gjs-db-code-panel-' + slotRecord.name + '"',
    ' aria-labelledby="gjs-db-code-tab-' + slotRecord.name + '"',
    slotIndex === 0 ? '>' : ' hidden>',
    buildCodeFieldMarkup({
      name: slotRecord.name,
      label: slotRecord.label,
      language: slotRecord.language,
      helpText: slotRecord.helpText,
    }),
    '</div>',
  ].join('');

const buildCustomCodeModalMarkup = (customCodeSettings) => {
  const slotRecords = getCustomCodeSlotRecords();
  const warningText =
    'Injected code runs with full access to your published pages and your visitors. ' +
    'Only paste code you trust. Script tags are stripped from every slot unless you allow scripts below.';
  const allowlistValue = (customCodeSettings.scriptOriginAllowlist || []).join('\n');
  const checkedAttribute = customCodeSettings.allowScripts ? ' checked' : '';
  return [
    '<form class="gjs-db-form gjs-db-custom-code-form">',
    '<p class="gjs-db-custom-code-warning">',
    getIconMarkup('warning', { size: 16 }),
    '<span>' + escapeHtmlText(warningText) + '</span>',
    '</p>',
    '<div class="gjs-db-code-tabs" role="tablist" aria-label="Code slots">',
    slotRecords.map(buildTabButtonMarkup).join(''),
    '</div>',
    slotRecords.map(buildTabPanelMarkup).join(''),
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label gjs-db-custom-code-toggle">',
    '<input type="checkbox" data-db-allow-scripts' + checkedAttribute + '>',
    '<span>Allow script tags in exports</span>',
    '</label>',
    '<span class="gjs-db-field-help">',
    'When off (recommended), the slots above are sanitized on save and custom script components stay inert. ',
    'When on, the slots are stored raw and exports may run scripts.',
    '</span>',
    '</div>',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="gjs-db-custom-code-origins">External script origin allowlist</label>',
    '<textarea class="gjs-db-field-input" id="gjs-db-custom-code-origins" data-db-script-origins rows="3">',
    escapeHtmlText(allowlistValue),
    '</textarea>',
    '<span class="gjs-db-field-help">One origin per line, for example https://cdn.example.com. ',
    'Recorded with your settings so exports can restrict external scripts to these origins.</span>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-custom-code-save>',
    'Save custom code',
    '</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildCustomCodeModalMarkup;
