const getPatternPresetRecords = () => [
  { id: '', label: 'Anything', pattern: '', message: '' },
  { id: 'letters', label: 'Letters and spaces only', pattern: '[A-Za-z\\s]+', message: 'Use letters only.' },
  { id: 'digits', label: 'Digits only', pattern: '[0-9]+', message: 'Use digits only.' },
  {
    id: 'letters-digits',
    label: 'Letters and digits',
    pattern: '[A-Za-z0-9]+',
    message: 'Use letters and digits only.',
  },
  {
    id: 'postal-code',
    label: 'Postal code (letters, digits, spaces)',
    pattern: '[A-Za-z0-9][A-Za-z0-9 -]{2,9}',
    message: 'Enter a valid postal code.',
  },
  { id: 'custom', label: 'Custom pattern (advanced)', pattern: null, message: 'Use the format this field asks for.' },
];

export default getPatternPresetRecords;
