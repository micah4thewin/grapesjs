import applyConditionRecordToControls from './applyConditionRecordToControls.js';
import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getConditionKindRecords from './getConditionKindRecords.js';
import readConditionControls from './readConditionControls.js';
import toggleConditionControlVisibility from './toggleConditionControlVisibility.js';
import writeComponentAttributeValue from './writeComponentAttributeValue.js';

const createConditionTraitDefinition = () => ({
  eventCapture: ['change', 'input'],
  createInput: ({ trait }) => {
    const kindOptions = getConditionKindRecords()
      .map((kindRecord) => `<option value="${kindRecord.id}">${escapeHtmlText(kindRecord.label)}</option>`)
      .join('');
    return [
      '<div class="gjs-db-field gjs-db-trait-condition">',
      `<select class="gjs-db-field-input" data-db-condition-kind${buildTraitAriaLabelAttribute(trait, '- when to show')}>${kindOptions}</select>`,
      '<input type="text" class="gjs-db-field-input" data-db-condition-field placeholder="Data field, e.g. product.inStock" ',
      `${buildTraitAriaLabelAttribute(trait, '- data field')} hidden>`,
      '<input type="text" class="gjs-db-field-input" data-db-condition-value placeholder="Value to match, e.g. yes" ',
      `${buildTraitAriaLabelAttribute(trait, '- value to match')} hidden>`,
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
