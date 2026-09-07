import getAutocompleteOptionRecords from './getAutocompleteOptionRecords.js';
import getInputTypeOptionRecords from './getInputTypeOptionRecords.js';
import getPatternPresetRecords from './getPatternPresetRecords.js';

const advancedCategory = { id: 'db-input-advanced', label: 'Advanced', open: false };

const buildInputTraitDefinitions = () => [
  {
    type: 'select',
    name: 'type',
    label: 'Input type',
    options: getInputTypeOptionRecords().map((typeRecord) => ({ id: typeRecord.id, label: typeRecord.label })),
  },
  { type: 'text', name: 'placeholder', label: 'Hint shown inside the box' },
  { type: 'text', name: 'value', label: 'Prefilled answer' },
  { type: 'text', name: 'min', label: 'Lowest allowed (number or date)', placeholder: 'e.g. 1 or 2026-01-01' },
  { type: 'text', name: 'max', label: 'Highest allowed (number or date)', placeholder: 'e.g. 10 or 2026-12-31' },
  { type: 'number', name: 'maxlength', label: 'Maximum characters', min: 1 },
  {
    type: 'select',
    name: 'data-db-pattern-preset',
    label: 'Allowed characters',
    options: getPatternPresetRecords().map((presetRecord) => ({ id: presetRecord.id, label: presetRecord.label })),
  },
  {
    type: 'select',
    name: 'autocomplete',
    label: 'Browser autofill',
    options: getAutocompleteOptionRecords(),
  },
  { type: 'text', name: 'name', label: 'Field name', placeholder: 'email', category: advancedCategory },
  { type: 'text', name: 'pattern', label: 'Custom pattern (regular expression)', category: advancedCategory },
  {
    type: 'text',
    name: 'data-db-pattern-message',
    label: 'Message when the pattern fails',
    category: advancedCategory,
  },
  { type: 'checkbox', name: 'readonly', label: 'Read only', valueTrue: 'readonly', category: advancedCategory },
];

export default buildInputTraitDefinitions;
