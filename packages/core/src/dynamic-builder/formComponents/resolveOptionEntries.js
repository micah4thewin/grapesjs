import parseOptionLinesText from './parseOptionLinesText.js';

const resolveOptionEntries = (optionsText) => {
  const optionEntries = parseOptionLinesText(optionsText);
  return optionEntries.length ? optionEntries : [{ optionValue: 'Option 1', optionLabel: 'Option 1' }];
};

export default resolveOptionEntries;
