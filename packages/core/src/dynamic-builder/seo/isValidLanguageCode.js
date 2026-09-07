const isValidLanguageCode = (languageCode) =>
  /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(String(languageCode || '').trim());

export default isValidLanguageCode;
