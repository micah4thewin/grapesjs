import listCustomFontFamilyNames from '../customAssets/listCustomFontFamilyNames.js';

const getFontCategoryRecords = () => [
  { categoryId: 'all', categoryLabel: 'All' },
  ...(listCustomFontFamilyNames().length ? [{ categoryId: 'custom', categoryLabel: 'My fonts' }] : []),
  { categoryId: 'sans', categoryLabel: 'Sans serif' },
  { categoryId: 'serif', categoryLabel: 'Serif' },
  { categoryId: 'display', categoryLabel: 'Display' },
  { categoryId: 'handwriting', categoryLabel: 'Handwriting' },
  { categoryId: 'mono', categoryLabel: 'Mono' },
];

export default getFontCategoryRecords;
