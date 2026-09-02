const normalizeTwitterHandle = (handleValue) => {
  let handleText = String(handleValue || '').trim();
  if (!handleText) return '';
  if (/^(https?:)?\/\//i.test(handleText)) {
    try {
      const parsedUrl = new URL(/^\/\//.test(handleText) ? 'https:' + handleText : handleText);
      if (!/(^|\.)(twitter|x)\.com$/i.test(parsedUrl.hostname)) return '';
      handleText = parsedUrl.pathname.split('/').filter(Boolean)[0] || '';
    } catch (parseError) {
      return '';
    }
  }
  handleText = handleText.replace(/^@+/, '');
  return /^[A-Za-z0-9_]{1,15}$/.test(handleText) ? '@' + handleText : '';
};

export default normalizeTwitterHandle;
