import getRepeaterAttributeNames from './getRepeaterAttributeNames.js';
import getRepeaterTraitCategory from './getRepeaterTraitCategory.js';

const buildRepeaterOrderingTraitDefinitions = () => {
  const attributeNames = getRepeaterAttributeNames();
  const category = getRepeaterTraitCategory();
  return [
    { type: 'text', name: attributeNames.sortField, label: 'Sort by field', placeholder: 'e.g. name', category },
    {
      type: 'select',
      name: attributeNames.sortDirection,
      label: 'Sort direction',
      options: [
        { id: 'asc', label: 'A to Z, low to high' },
        { id: 'desc', label: 'Z to A, high to low' },
      ],
      default: 'asc',
      category,
    },
    {
      type: 'text',
      name: attributeNames.filterField,
      label: 'Only show items where field',
      placeholder: 'e.g. featured',
      category,
    },
    {
      type: 'text',
      name: attributeNames.filterValue,
      label: 'has this value',
      placeholder: 'Blank means any value',
      category,
    },
  ];
};

export default buildRepeaterOrderingTraitDefinitions;
