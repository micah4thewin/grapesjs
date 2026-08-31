const getColumnPresetRecord = () => ({
  two: { label: 'Two columns', columnCount: 2, gridTemplate: 'repeat(2, minmax(0, 1fr))' },
  three: { label: 'Three columns', columnCount: 3, gridTemplate: 'repeat(3, minmax(0, 1fr))' },
  four: { label: 'Four columns', columnCount: 4, gridTemplate: 'repeat(4, minmax(0, 1fr))' },
  'sidebar-left': { label: 'Sidebar left', columnCount: 2, gridTemplate: 'minmax(0, 1fr) minmax(0, 2.5fr)' },
  'sidebar-right': { label: 'Sidebar right', columnCount: 2, gridTemplate: 'minmax(0, 2.5fr) minmax(0, 1fr)' },
  asymmetric: { label: 'Asymmetric', columnCount: 2, gridTemplate: 'minmax(0, 3fr) minmax(0, 2fr)' },
});

export default getColumnPresetRecord;
