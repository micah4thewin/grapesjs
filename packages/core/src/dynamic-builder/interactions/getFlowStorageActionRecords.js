import getFlowTargetFieldRecord from './getFlowTargetFieldRecord.js';

const keyField = { name: 'key', label: 'Name of the value', type: 'text', placeholder: 'banner-closed' };

const getFlowStorageActionRecords = () => [
  {
    id: 'remember',
    label: 'Remember a value',
    hint: 'Saved in the visitor browser, so it survives reloads and later visits. Read it back with "When a remembered value exists".',
    fields: [keyField, { name: 'value', label: 'Value', type: 'text', placeholder: 'yes', default: 'yes' }],
  },
  {
    id: 'show-if-remembered',
    label: 'Show or hide by a remembered value',
    hint: 'Looks up a value saved with "Remember a value" and shows or hides the target depending on it.',
    fields: [
      getFlowTargetFieldRecord(),
      keyField,
      { name: 'value', label: 'Equals', type: 'text', placeholder: 'yes', default: 'yes' },
      {
        name: 'mode',
        label: 'When it matches',
        type: 'select',
        default: 'show',
        options: [
          { id: 'show', label: 'Show the target, otherwise hide it' },
          { id: 'hide', label: 'Hide the target, otherwise show it' },
        ],
      },
    ],
  },
  { id: 'forget', label: 'Forget a remembered value', fields: [keyField] },
];

export default getFlowStorageActionRecords;
