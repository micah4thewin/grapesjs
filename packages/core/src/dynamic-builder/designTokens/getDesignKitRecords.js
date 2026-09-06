const getDesignKitRecords = () => [
  {
    kitId: 'modern-sans',
    kitName: 'Modern Sans',
    kitHint: 'Crisp, neutral, product-ready',
    fontFamilies: ['Inter'],
    tokens: {
      font: { display: "'Inter', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif" },
      color: { brand: '#4f46e5', accent: '#0369a1', text: '#111827', textMuted: '#4b5563', surfaceAlt: '#f3f4f6' },
    },
  },
  {
    kitId: 'editorial-serif',
    kitName: 'Editorial Serif',
    kitHint: 'Magazine headlines, warm reading',
    fontFamilies: ['Playfair Display', 'Source Serif 4'],
    tokens: {
      font: { display: "'Playfair Display', Georgia, serif", body: "'Source Serif 4', Georgia, serif" },
      color: { brand: '#9d174d', accent: '#b45309', text: '#1c1917', textMuted: '#57534e', surfaceAlt: '#faf7f2' },
    },
  },
  {
    kitId: 'friendly-round',
    kitName: 'Friendly Round',
    kitHint: 'Soft, approachable, community feel',
    fontFamilies: ['Nunito'],
    tokens: {
      font: { display: "'Nunito', system-ui, sans-serif", body: "'Nunito', system-ui, sans-serif" },
      color: { brand: '#0d9488', accent: '#c2410c', text: '#134e4a', textMuted: '#526b68', surfaceAlt: '#f0fdfa' },
    },
  },
  {
    kitId: 'studio-mono',
    kitName: 'Studio Mono',
    kitHint: 'Technical, precise, portfolio-grade',
    fontFamilies: ['Space Grotesk', 'IBM Plex Mono'],
    tokens: {
      font: { display: "'Space Grotesk', system-ui, sans-serif", body: "'IBM Plex Mono', ui-monospace, monospace" },
      color: { brand: '#18181b', accent: '#3f6212', text: '#18181b', textMuted: '#52525b', surfaceAlt: '#f4f4f5' },
    },
  },
];

export default getDesignKitRecords;
