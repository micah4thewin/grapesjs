const stripControlCharacters = (textValue) => {
  let compactText = '';
  for (const character of String(textValue == null ? '' : textValue)) {
    if (character.charCodeAt(0) > 32) compactText += character;
  }
  return compactText;
};

export default stripControlCharacters;
