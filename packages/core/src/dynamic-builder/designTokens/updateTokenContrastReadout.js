import describeTokenContrast from './describeTokenContrast.js';
import getTokenContrastPairs from './getTokenContrastPairs.js';

const updateTokenContrastReadout = (readoutElement, tokenName, tokenRecord) => {
  const pairRecord = getTokenContrastPairs()[tokenName];
  const colorRecord = tokenRecord && tokenRecord.color ? tokenRecord.color : {};
  const contrast = pairRecord ? describeTokenContrast(colorRecord[tokenName], colorRecord[pairRecord.against]) : null;
  readoutElement.hidden = !contrast;
  if (!contrast) {
    readoutElement.textContent = '';
    readoutElement.removeAttribute('data-kind');
    return;
  }
  readoutElement.setAttribute('data-kind', contrast.kind);
  readoutElement.textContent = `${contrast.text} · ${pairRecord.usage}`;
};

export default updateTokenContrastReadout;
