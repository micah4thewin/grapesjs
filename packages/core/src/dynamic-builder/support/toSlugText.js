const toSlugText = (textValue) => {
  const normalizedText = String(textValue || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
  let slugText = '';
  try {
    slugText = normalizedText.replace(/[^\p{L}\p{N}]+/gu, '-');
  } catch (unicodeError) {
    slugText = normalizedText.replace(/[^a-z0-9]+/g, '-');
  }
  return slugText.replace(/^-+|-+$/g, '');
};

export default toSlugText;
