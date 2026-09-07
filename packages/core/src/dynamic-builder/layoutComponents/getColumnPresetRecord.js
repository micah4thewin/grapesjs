const getColumnPresetRecord = () => ({
  two: { label: 'Two equal columns', columnCount: 2, gridTemplate: 'repeat(2, minmax(0, 1fr))' },
  three: { label: 'Three equal columns', columnCount: 3, gridTemplate: 'repeat(3, minmax(0, 1fr))' },
  four: { label: 'Four equal columns', columnCount: 4, gridTemplate: 'repeat(4, minmax(0, 1fr))' },
  'sidebar-left': {
    label: 'Narrow + wide (sidebar left)',
    columnCount: 2,
    gridTemplate: 'minmax(0, 1fr) minmax(0, 2.5fr)',
  },
  'sidebar-right': {
    label: 'Wide + narrow (sidebar right)',
    columnCount: 2,
    gridTemplate: 'minmax(0, 2.5fr) minmax(0, 1fr)',
  },
  asymmetric: { label: 'Wide + narrow (60/40)', columnCount: 2, gridTemplate: 'minmax(0, 3fr) minmax(0, 2fr)' },
  custom: {
    label: 'Custom widths (drag between columns)',
    columnCount: 0,
    gridTemplate: 'var(--db-col-template, repeat(2, minmax(0, 1fr)))',
  },
});

export default getColumnPresetRecord;
