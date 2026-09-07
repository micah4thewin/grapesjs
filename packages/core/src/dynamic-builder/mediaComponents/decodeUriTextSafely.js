const decodeUriTextSafely = (encodedText) => {
  try {
    return decodeURIComponent(String(encodedText || ''));
  } catch (decodeError) {
    return String(encodedText || '');
  }
};

export default decodeUriTextSafely;
