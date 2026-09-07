const resolveUrlHostText = (urlText) => {
  try {
    return new URL(String(urlText || '')).host;
  } catch (parseError) {
    return '';
  }
};

export default resolveUrlHostText;
