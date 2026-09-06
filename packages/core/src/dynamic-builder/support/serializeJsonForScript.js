const lineSeparator = String.fromCharCode(8232);
const paragraphSeparator = String.fromCharCode(8233);

const serializeJsonForScript = (jsonValue, indentSize) =>
  JSON.stringify(jsonValue, null, indentSize)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(lineSeparator)
    .join('\\u2028')
    .split(paragraphSeparator)
    .join('\\u2029');

export default serializeJsonForScript;
