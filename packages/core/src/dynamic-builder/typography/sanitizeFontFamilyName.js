const sanitizeFontFamilyName = (familyValue) =>
  String(familyValue == null ? '' : familyValue)
    .replace(/[^a-zA-Z0-9 -]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export default sanitizeFontFamilyName;
