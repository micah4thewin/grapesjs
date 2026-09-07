import buildFlowCardMarkup from './buildFlowCardMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getFlowRecipeRecords from './getFlowRecipeRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildRecipeSelectMarkup = () =>
  [
    '<select class="gjs-db-field-input gjs-db-flow-recipe" data-db-flow-recipe aria-label="Start from a recipe">',
    '<option value="">Start from a recipe</option>',
    getFlowRecipeRecords()
      .map(
        (recipeRecord) =>
          '<option value="' + escapeHtmlText(recipeRecord.id) + '">' + escapeHtmlText(recipeRecord.label) + '</option>',
      )
      .join(''),
    '</select>',
  ].join('');

const buildFlowBuilderMarkup = (flowRecords, componentLabel) => {
  const cardsMarkup = flowRecords.map((flowRecord, flowIndex) => buildFlowCardMarkup(flowRecord, flowIndex)).join('');
  const emptyMarkup = [
    '<p class="gjs-db-flow-empty">',
    'No flows yet. Add one to make this element do something when a visitor clicks, hovers or scrolls to it, ',
    'or start from a recipe below.',
    '</p>',
  ].join('');
  return [
    '<form class="gjs-db-form gjs-db-flow-builder">',
    '<p class="gjs-db-flow-intro">',
    'Flows on <strong>' + escapeHtmlText(componentLabel) + '</strong>. ',
    'Pick when it runs, then stack the steps that follow.',
    '</p>',
    '<ul class="gjs-db-flow-list" data-db-flow-list>' + cardsMarkup + '</ul>',
    flowRecords.length ? '' : emptyMarkup,
    '<div class="gjs-db-flow-toolbar">',
    '<button type="button" class="gjs-db-button" data-db-flow-action="add">',
    getIconMarkup('plus', { size: 14 }),
    '<span>Add a flow</span>',
    '</button>',
    buildRecipeSelectMarkup(),
    '</div>',
    '<div class="gjs-db-button-row gjs-db-flow-footer">',
    '<button type="button" class="gjs-db-button" data-db-flow-action="cancel">Cancel</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-flow-action="save">Save flows</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildFlowBuilderMarkup;
