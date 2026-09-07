import listCustomFontFamilyRecords from './listCustomFontFamilyRecords.js';

const listCustomFontFamilyNames = () => listCustomFontFamilyRecords().map((familyRecord) => familyRecord.family);

export default listCustomFontFamilyNames;
