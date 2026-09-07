const mixInk = (inkValue, percentValue) => `color-mix(in srgb, ${inkValue} ${percentValue}%, transparent)`;

const getSectionThemeRecord = () => {
  const lightInk = 'var(--db-theme-light-ink, #ffffff)';
  const brandInk = 'var(--db-theme-brand-ink, #ffffff)';
  return {
    light: {
      background: 'var(--db-color-surface-alt, #f4f6fa)',
      tokens: { '--db-color-surface-alt': lightInk },
    },
    brand: {
      background: 'var(--db-theme-brand-surface, #4f46e5)',
      tokens: {
        '--db-color-text': brandInk,
        '--db-color-text-muted': mixInk(brandInk, 78),
        '--db-color-line': mixInk(brandInk, 32),
        '--db-color-surface': mixInk(brandInk, 16),
        '--db-color-surface-alt': mixInk(brandInk, 12),
        '--db-color-brand': brandInk,
        '--db-color-accent': brandInk,
        '--db-color-brand-contrast': 'var(--db-theme-brand-surface, #4f46e5)',
      },
    },
    dark: {
      background: 'var(--db-theme-dark-surface, #111827)',
      tokens: {
        '--db-color-text': lightInk,
        '--db-color-text-muted': mixInk(lightInk, 74),
        '--db-color-line': mixInk(lightInk, 22),
        '--db-color-surface': mixInk(lightInk, 12),
        '--db-color-surface-alt': mixInk(lightInk, 8),
      },
    },
  };
};

export default getSectionThemeRecord;
