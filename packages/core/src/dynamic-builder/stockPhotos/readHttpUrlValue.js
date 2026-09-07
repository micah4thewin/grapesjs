const readHttpUrlValue = (urlValue) => {
  const trimmedValue = String(urlValue == null ? '' : urlValue).trim();
  return /^https?:\/\/[^\s<>]+$/i.test(trimmedValue) ? trimmedValue : '';
};

export default readHttpUrlValue;
