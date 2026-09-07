const getTokenContrastPairs = () => ({
  text: { against: 'surface', usage: 'text on the page background' },
  textMuted: { against: 'surface', usage: 'muted text on the page background' },
  accent: { against: 'surface', usage: 'accent text on the page background' },
  brand: { against: 'surface', usage: 'brand links on the page background' },
  brandContrast: { against: 'brand', usage: 'text on brand buttons' },
  success: { against: 'surface', usage: 'success text on the page background' },
  warning: { against: 'surface', usage: 'warning text on the page background' },
  danger: { against: 'surface', usage: 'danger text on the page background' },
});

export default getTokenContrastPairs;
