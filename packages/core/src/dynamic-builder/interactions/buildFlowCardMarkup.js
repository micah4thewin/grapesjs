import buildFlowActionRowMarkup from './buildFlowActionRowMarkup.js';
import buildFlowFieldMarkup from './buildFlowFieldMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getFlowTriggerRecords from './getFlowTriggerRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFlowCardMarkup = (flowRecord, flowIndex) => {
  const triggerRecords = getFlowTriggerRecords();
  const triggerRecord = triggerRecords.find((candidate) => candidate.id === flowRecord.trigger) || triggerRecords[0];
  const triggerOptionsMarkup = triggerRecords
    .map(
      (candidate) =>
        '<option value="' +
        escapeHtmlText(candidate.id) +
        '"' +
        (candidate.id === triggerRecord.id ? ' selected' : '') +
        '>' +
        escapeHtmlText(candidate.label) +
        '</option>',
    )
    .join('');
  const triggerFieldsMarkup = triggerRecord.fields
    .map((fieldRecord) =>
      buildFlowFieldMarkup(fieldRecord, flowRecord.triggerOptions[fieldRecord.name], 'trigger:' + flowIndex),
    )
    .join('');
  const actionsMarkup = flowRecord.actions
    .map((actionRecord, actionIndex) => buildFlowActionRowMarkup(actionRecord, flowIndex, actionIndex))
    .join('');
  return [
    '<li class="gjs-db-flow-card" data-db-flow-index="' +
      flowIndex +
      '" data-db-flow-id="' +
      escapeHtmlText(flowRecord.id) +
      '">',
    '<div class="gjs-db-flow-card-head">',
    '<span class="gjs-db-flow-card-icon">' + getIconMarkup('flow', { size: 16 }) + '</span>',
    '<select class="gjs-db-field-input gjs-db-flow-trigger" data-db-flow-trigger aria-label="Trigger">',
    triggerOptionsMarkup,
    '</select>',
    '<button type="button" class="gjs-db-button gjs-db-flow-icon-button" data-db-flow-remove ',
    'title="Delete this flow" aria-label="Delete flow ' + (flowIndex + 1) + '">',
    getIconMarkup('trash', { size: 14 }),
    '</button>',
    '</div>',
    '<p class="gjs-db-flow-hint">' + escapeHtmlText(triggerRecord.hint) + '</p>',
    triggerFieldsMarkup ? '<div class="gjs-db-flow-fields">' + triggerFieldsMarkup + '</div>' : '',
    '<ol class="gjs-db-flow-actions">' + actionsMarkup + '</ol>',
    '<button type="button" class="gjs-db-button gjs-db-flow-add-action" data-db-flow-add-action>',
    getIconMarkup('plus', { size: 14 }),
    '<span>Add a step</span>',
    '</button>',
    '</li>',
  ].join('');
};

export default buildFlowCardMarkup;
