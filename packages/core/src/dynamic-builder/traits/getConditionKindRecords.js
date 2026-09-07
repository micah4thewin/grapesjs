const getConditionKindRecords = () => [
  { id: 'always', label: 'Always show' },
  { id: 'never', label: 'Never show' },
  { id: 'fieldTruthy', label: 'Show when the field has a value' },
  { id: 'fieldEquals', label: 'Show when the field equals a value' },
];

export default getConditionKindRecords;
