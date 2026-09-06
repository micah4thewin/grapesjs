import listSymbolRecords from './listSymbolRecords.js';

const buildSymbolTraitDefinitions = (editor) => {
  const symbolOptions = listSymbolRecords(editor).map((symbolRecord) => ({
    id: symbolRecord.id,
    label: String(symbolRecord.name || symbolRecord.id),
  }));
  return [
    {
      type: 'select',
      name: 'data-db-symbol',
      label: 'Reusable component',
      options: symbolOptions.length ? symbolOptions : [{ id: '', label: 'No reusable components yet' }],
    },
    {
      type: 'button',
      name: 'db-symbol-edit',
      label: '',
      text: 'Edit everywhere',
      full: true,
      command: 'db:edit-symbol',
    },
    {
      type: 'button',
      name: 'db-symbol-detach',
      label: '',
      text: 'Detach this copy',
      full: true,
      command: 'db:detach-symbol',
    },
  ];
};

export default buildSymbolTraitDefinitions;
