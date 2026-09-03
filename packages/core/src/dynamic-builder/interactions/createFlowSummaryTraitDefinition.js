import describeFlowSummary from './describeFlowSummary.js';
import parseFlowRecords from './parseFlowRecords.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';

const createFlowSummaryTraitDefinition = () => ({
  noLabel: false,
  createInput: () =>
    [
      '<div class="gjs-db-field gjs-db-flow-summary">',
      '<span class="gjs-db-flow-summary-text" data-db-flow-summary>No flows yet</span>',
      '</div>',
    ].join(''),
  onUpdate: ({ component, elInput }) => {
    const summaryElement = resolveTraitInnerElement(elInput, '[data-db-flow-summary]');
    if (!summaryElement) return;
    const attributesRecord = component && component.getAttributes ? component.getAttributes() : {};
    summaryElement.textContent = describeFlowSummary(parseFlowRecords(attributesRecord['data-db-flows']));
  },
});

export default createFlowSummaryTraitDefinition;
