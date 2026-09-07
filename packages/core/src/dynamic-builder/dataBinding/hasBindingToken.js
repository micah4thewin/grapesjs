import getBindingTokenPattern from './getBindingTokenPattern.js';

const hasBindingToken = (textValue) => getBindingTokenPattern().test(String(textValue == null ? '' : textValue));

export default hasBindingToken;
