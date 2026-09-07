import parseBindingToken from './parseBindingToken.js';

const isHtmlBindingToken = (tokenBody) => parseBindingToken(tokenBody).filterName === 'html';

export default isHtmlBindingToken;
