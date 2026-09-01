const buildDesignKitFontImportCss = (fontFamilies) => {
  const familyQuery = (fontFamilies || [])
    .map((familyName) => `family=${encodeURIComponent(familyName).split('%20').join('+')}:wght@400;600;700;800`)
    .join('&');
  if (!familyQuery) return '';
  return `@import url('https://fonts.googleapis.com/css2?${familyQuery}&display=swap');`;
};

export default buildDesignKitFontImportCss;
