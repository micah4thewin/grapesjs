import escapeHtmlText from '../support/escapeHtmlText.js';
import buildRadioChoiceDefinition from './buildRadioChoiceDefinition.js';
import resolveOptionEntries from './resolveOptionEntries.js';

const buildRadioGroupChildrenDefinitions = (legendText, groupName, optionsText, selectedValue, isRequired) => [
  {
    type: 'db-field-label',
    tagName: 'legend',
    classes: ['db-field-label'],
    attributes: { 'data-db-radio-legend': 'true' },
    components: escapeHtmlText(String(legendText || 'Choose an option')),
  },
  {
    tagName: 'div',
    classes: ['db-choice-list'],
    attributes: { 'data-db-radio-options': 'true' },
    draggable: false,
    droppable: false,
    copyable: false,
    removable: false,
    traits: [],
    components: resolveOptionEntries(optionsText).map((optionEntry) =>
      buildRadioChoiceDefinition(optionEntry, groupName, selectedValue, isRequired),
    ),
  },
];

export default buildRadioGroupChildrenDefinitions;
