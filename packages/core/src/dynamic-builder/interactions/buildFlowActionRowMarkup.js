import buildFlowFieldMarkup from './buildFlowFieldMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getFlowActionRecords from './getFlowActionRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFlowActionRowMarkup = (actionRecord, flowIndex, actionIndex) => {
  const catalogRecords = getFlowActionRecords();
  const catalogRecord = catalogRecords.find((candidate) => candidate.id === actionRecord.type) || catalogRecords[0];
  const fieldScope = 'action:' + flowIndex + ':' + actionIndex;
  const typeOptionsMarkup = catalogRecords
    .map(
      (candidate) =>
        '<option value="' +
        escapeHtmlText(candidate.id) +
        '"' +
        (candidate.id === catalogRecord.id ? ' selected' : '') +
        '>' +
        escapeHtmlText(candidate.label) +
        '</option>',
    )
    .join('');
  const fieldsMarkup = catalogRecord.fields
    .map((fieldRecord) => buildFlowFieldMarkup(fieldRecord, actionRecord.options[fieldRecord.name], fieldScope))
    .join('');
  return [
    '<li class="gjs-db-flow-action" data-db-flow-action-index="' + actionIndex + '">',
    '<div class="gjs-db-flow-action-head">',
    '<span class="gjs-db-flow-step">' + (actionIndex + 1) + '</span>',
    '<select class="gjs-db-field-input gjs-db-flow-action-type" data-db-flow-action-type ',
    'aria-label="Step ' + (actionIndex + 1) + ' action">',
    typeOptionsMarkup,
    '</select>',
    '<button type="button" class="gjs-db-button gjs-db-flow-icon-button" data-db-flow-remove-action ',
    'title="Remove this step" aria-label="Remove step ' + (actionIndex + 1) + '">',
    getIconMarkup('trash', { size: 14 }),
    '</button>',
    '</div>',
    catalogRecord.hint ? '<p class="gjs-db-flow-hint">' + escapeHtmlText(catalogRecord.hint) + '</p>' : '',
    fieldsMarkup ? '<div class="gjs-db-flow-fields">' + fieldsMarkup + '</div>' : '',
    '</li>',
  ].join('');
};

export default buildFlowActionRowMarkup;
