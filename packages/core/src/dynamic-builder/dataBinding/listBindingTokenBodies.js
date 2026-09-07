import getBindingTokenPattern from './getBindingTokenPattern.js';

const listBindingTokenBodies = (textValue) => {
  const tokenBodies = [];
  const tokenPattern = getBindingTokenPattern();
  const safeText = String(textValue == null ? '' : textValue);
  let tokenMatch = tokenPattern.exec(safeText);
  while (tokenMatch) {
    tokenBodies.push(tokenMatch[1].trim());
    tokenMatch = tokenPattern.exec(safeText);
  }
  return tokenBodies;
};

export default listBindingTokenBodies;
