const getGridPresetRecords = () => ({
  columns: [
    { id: 'none', label: 'Automatic' },
    { id: 'repeat(1, minmax(0, 1fr))', label: '1 column' },
    { id: 'repeat(2, minmax(0, 1fr))', label: '2 equal columns' },
    { id: 'repeat(3, minmax(0, 1fr))', label: '3 equal columns' },
    { id: 'repeat(4, minmax(0, 1fr))', label: '4 equal columns' },
    { id: 'repeat(5, minmax(0, 1fr))', label: '5 equal columns' },
    { id: 'repeat(6, minmax(0, 1fr))', label: '6 equal columns' },
    { id: 'minmax(200px, 1fr) 3fr', label: 'Sidebar on the left' },
    { id: '3fr minmax(200px, 1fr)', label: 'Sidebar on the right' },
    { id: 'repeat(auto-fit, minmax(220px, 1fr))', label: 'Cards that wrap' },
  ],
  rows: [
    { id: 'none', label: 'Automatic' },
    { id: 'repeat(2, minmax(0, 1fr))', label: '2 equal rows' },
    { id: 'repeat(3, minmax(0, 1fr))', label: '3 equal rows' },
    { id: 'auto 1fr auto', label: 'Header, content, footer' },
  ],
  span: [
    { id: 'auto', label: 'One cell' },
    { id: 'span 2', label: 'Span 2' },
    { id: 'span 3', label: 'Span 3' },
    { id: 'span 4', label: 'Span 4' },
    { id: '1 / -1', label: 'Full width' },
  ],
});

export default getGridPresetRecords;
