import applyConditionRecordToControls from './applyConditionRecordToControls.js';
import readConditionControls from './readConditionControls.js';
import toggleConditionControlVisibility from './toggleConditionControlVisibility.js';
import writeComponentAttributeValue from './writeComponentAttributeValue.js';

const createConditionTraitDefinition = () => ({
  eventCapture: ['change', 'input'],
  createInput: () => {
    const kindOptions = ['always', 'never', 'fieldTruthy', 'fieldEquals']
      .map((conditionKind) => `<option value="${conditionKind}">${conditionKind}</option>`)
      .join('');
    return [
      '<div class="gjs-db-field gjs-db-trait-condition">',
      `<select class="gjs-db-field-input" data-db-condition-kind aria-label="Condition kind">${kindOptions}</select>`,
      '<input type="text" class="gjs-db-field-input" data-db-condition-field placeholder="Field path" ',
      'aria-label="Condition field path" hidden>',
      '<input type="text" class="gjs-db-field-input" data-db-condition-value placeholder="Expected value" ',
      'aria-label="Condition expected value" hidden>',
      '</div>',
    ].join('');
  },
  onEvent: ({ component, elInput }) => {
    const conditionRecord = readConditionControls(elInput);
    if (!conditionRecord) return;
    toggleConditionControlVisibility(elInput, conditionRecord.kind);
    writeComponentAttributeValue(component, 'data-db-condition', JSON.stringify(conditionRecord));
  },
  onUpdate: ({ component, elInput }) => {
    const storedRecord = component && component.getAttributes ? component.getAttributes()['data-db-condition'] : '';
    applyConditionRecordToControls(elInput, storedRecord);
  },
});

export default createConditionTraitDefinition;
