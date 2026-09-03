import buildFlowCardMarkup from './buildFlowCardMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFlowBuilderMarkup = (flowRecords, componentLabel, allowScripts) => {
  const cardsMarkup = flowRecords.map((flowRecord, flowIndex) => buildFlowCardMarkup(flowRecord, flowIndex)).join('');
  const emptyMarkup = [
    '<p class="gjs-db-flow-empty">',
    'No flows yet. Add one to make this element do something when a visitor clicks, hovers or scrolls to it.',
    '</p>',
  ].join('');
  return [
    '<form class="gjs-db-form gjs-db-flow-builder">',
    '<p class="gjs-db-flow-intro">',
    'Flows on <strong>' + escapeHtmlText(componentLabel) + '</strong>. ',
    'Pick when it runs, then stack the steps that follow.',
    '</p>',
    allowScripts
      ? ''
      : '<p class="gjs-db-flow-notice">' +
        getIconMarkup('info', { size: 15 }) +
        '<span>Every step below works on exports. "Run custom JavaScript" stays inert until you turn on ' +
        '<strong>Allow script tags</strong> in Custom code.</span></p>',
    '<ul class="gjs-db-flow-list" data-db-flow-list>' + cardsMarkup + '</ul>',
    flowRecords.length ? '' : emptyMarkup,
    '<div class="gjs-db-button-row gjs-db-flow-footer">',
    '<button type="button" class="gjs-db-button" data-db-flow-add>',
    getIconMarkup('plus', { size: 14 }),
    '<span>Add a flow</span>',
    '</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-flow-save>Save flows</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildFlowBuilderMarkup;
