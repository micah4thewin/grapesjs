import sanitizeFontFamilyName from './sanitizeFontFamilyName.js';

const buildFontVariableOverrideCss = (moduleOptions) => {
  const safeOptions = moduleOptions || {};
  const displayFamily = sanitizeFontFamilyName(safeOptions.displayFont);
  const bodyFamily = sanitizeFontFamilyName(safeOptions.bodyFont);
  const overrideLines = [];
  if (bodyFamily) {
    overrideLines.push(
      `  --db-font-body: "${bodyFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;`,
    );
  }
  if (displayFamily) {
    overrideLines.push(`  --db-font-display: "${displayFamily}", var(--db-font-body, sans-serif);`);
  }
  if (!overrideLines.length) return '';
  return `:root {\n${overrideLines.join('\n')}\n}\n`;
};

export default buildFontVariableOverrideCss;
