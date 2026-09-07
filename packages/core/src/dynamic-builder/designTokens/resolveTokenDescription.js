import formatTokenLabelText from './formatTokenLabelText.js';
import getTokenDescriptionRecords from './getTokenDescriptionRecords.js';

const resolveTokenDescription = (groupKey, tokenName) =>
  getTokenDescriptionRecords()[`${groupKey}.${tokenName}`] || { label: formatTokenLabelText(tokenName), help: '' };

export default resolveTokenDescription;
