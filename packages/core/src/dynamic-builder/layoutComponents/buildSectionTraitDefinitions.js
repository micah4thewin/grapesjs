import buildOptionalAttributeSetter from './buildOptionalAttributeSetter.js';

const buildSectionTraitDefinitions = () => [
  {
    type: 'select',
    name: 'data-db-layout',
    label: 'Width',
    default: 'contained',
    options: [
      { id: 'contained', label: 'Normal' },
      { id: 'full', label: 'Full width' },
      { id: 'narrow', label: 'Narrow' },
      { id: 'wide', label: 'Wide' },
    ],
  },
  {
    type: 'select',
    name: 'data-db-padding',
    label: 'Vertical spacing',
    setValue: buildOptionalAttributeSetter('data-db-padding', 'normal'),
    options: [
      { id: 'normal', label: 'Normal' },
      { id: 'none', label: 'None' },
      { id: 'compact', label: 'Compact' },
      { id: 'spacious', label: 'Spacious' },
    ],
  },
  {
    type: 'select',
    name: 'data-db-min-height',
    label: 'Minimum height',
    setValue: buildOptionalAttributeSetter('data-db-min-height', 'auto'),
    options: [
      { id: 'auto', label: 'Fit content' },
      { id: 'half', label: 'Half screen' },
      { id: 'full', label: 'Full screen' },
    ],
  },
  {
    type: 'select',
    name: 'data-db-align',
    label: 'Content alignment',
    setValue: buildOptionalAttributeSetter('data-db-align', 'left'),
    options: [
      { id: 'left', label: 'Left' },
      { id: 'center', label: 'Centered' },
    ],
  },
  {
    type: 'select',
    name: 'data-db-theme',
    label: 'Background',
    default: 'default',
    options: [
      { id: 'default', label: 'Site default' },
      { id: 'light', label: 'Light grey' },
      { id: 'dark', label: 'Dark' },
      { id: 'brand', label: 'Brand colour' },
    ],
  },
  { type: 'db-asset', name: 'data-db-bg-image', label: 'Background image' },
  { type: 'checkbox', name: 'data-db-overlay', label: 'Darken the image so text stays readable', valueTrue: 'true' },
  { type: 'db-anchor', name: 'dbAnchor', changeProp: true, label: 'Anchor link', placeholder: 'e.g. pricing' },
];

export default buildSectionTraitDefinitions;
