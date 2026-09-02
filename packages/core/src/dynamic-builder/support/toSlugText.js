const toSlugText = (textValue) => {
  const normalizedText = String(textValue || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '');
  let slugText = '';
  try {
    slugText = normalizedText.replace(/[^\p{L}\p{N}]+/gu, '-');
  } catch (unicodeError) {
    slugText = normalizedText.replace(/[^a-z0-9]+/g, '-');
  }
  return slugText.replace(/^-+|-+$/g, '');
};

export default toSlugText;
