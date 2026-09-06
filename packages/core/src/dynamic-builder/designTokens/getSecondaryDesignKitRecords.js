const getSecondaryDesignKitRecords = () => [
  {
    kitId: 'warm-earth',
    kitName: 'Warm Earth',
    kitHint: 'Organic, grounded, food and craft',
    fontFamilies: ['Fraunces', 'Work Sans'],
    tokens: {
      font: { display: "'Fraunces', Georgia, serif", body: "'Work Sans', system-ui, sans-serif" },
      color: { brand: '#92400e', accent: '#4d7c0f', text: '#292524', textMuted: '#57534e', surfaceAlt: '#fef7ed' },
    },
  },
  {
    kitId: 'bold-contrast',
    kitName: 'Bold Contrast',
    kitHint: 'Loud, confident, launch energy',
    fontFamilies: ['Archivo'],
    tokens: {
      font: { display: "'Archivo', system-ui, sans-serif", body: "'Archivo', system-ui, sans-serif" },
      color: { brand: '#dc2626', accent: '#1d4ed8', text: '#0a0a0a', textMuted: '#404040', surfaceAlt: '#fafafa' },
    },
  },
  {
    kitId: 'calm-professional',
    kitName: 'Calm Professional',
    kitHint: 'Trustworthy, finance and consulting',
    fontFamilies: ['Libre Franklin'],
    tokens: {
      font: { display: "'Libre Franklin', system-ui, sans-serif", body: "'Libre Franklin', system-ui, sans-serif" },
      color: { brand: '#1e3a8a', accent: '#0e7490', text: '#111827', textMuted: '#4b5563', surfaceAlt: '#eff6ff' },
    },
  },
  {
    kitId: 'night-mode',
    kitName: 'Night Mode',
    kitHint: 'Dark surfaces, luminous accents',
    fontFamilies: ['Sora'],
    tokens: {
      font: { display: "'Sora', system-ui, sans-serif", body: "'Sora', system-ui, sans-serif" },
      color: {
        brand: '#a5b4fc',
        brandContrast: '#0f172a',
        accent: '#5eead4',
        surface: '#0f172a',
        surfaceAlt: '#1e293b',
        text: '#e2e8f0',
        textMuted: '#94a3b8',
        line: '#334155',
        focusRing: '#a5b4fc',
      },
    },
  },
];

export default getSecondaryDesignKitRecords;
