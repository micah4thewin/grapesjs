import writeComponentAttributeValue from '../traits/writeComponentAttributeValue.js';

const buildOpenInTraitDefinition = () => ({
  type: 'select',
  name: 'target',
  label: 'Open in',
  setValue: ({ component, value }) =>
    writeComponentAttributeValue(component, 'target', value === '_blank' ? '_blank' : ''),
  options: [
    { id: '', label: 'Same tab' },
    { id: '_blank', label: 'New tab' },
  ],
});

export default buildOpenInTraitDefinition;
