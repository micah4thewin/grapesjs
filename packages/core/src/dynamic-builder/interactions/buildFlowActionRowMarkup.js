import buildFlowFieldMarkup from './buildFlowFieldMarkup.js';
import buildFlowIconButtonMarkup from './buildFlowIconButtonMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getFlowActionRecords from './getFlowActionRecords.js';

const buildFlowActionRowMarkup = (actionRecord, flowIndex, actionIndex, actionCount) => {
  const catalogRecords = getFlowActionRecords();
  const catalogRecord = catalogRecords.find((candidate) => candidate.id === actionRecord.type) || catalogRecords[0];
  const fieldScope = 'action:' + flowIndex + ':' + actionIndex;
  const stepLabel = 'step ' + (actionIndex + 1);
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
    actionIndex > 0 ? buildFlowIconButtonMarkup('move-up', 'arrow-up', 'Move ' + stepLabel + ' up') : '',
    actionIndex < actionCount - 1
      ? buildFlowIconButtonMarkup('move-down', 'arrow-down', 'Move ' + stepLabel + ' down')
      : '',
    buildFlowIconButtonMarkup('remove-step', 'trash', 'Remove ' + stepLabel),
    '</div>',
    catalogRecord.hint ? '<p class="gjs-db-flow-hint">' + escapeHtmlText(catalogRecord.hint) + '</p>' : '',
    fieldsMarkup ? '<div class="gjs-db-flow-fields">' + fieldsMarkup + '</div>' : '',
    '</li>',
  ].join('');
};

export default buildFlowActionRowMarkup;
