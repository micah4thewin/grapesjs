import buildFontVariableOverrideCss from './buildFontVariableOverrideCss.js';
import buildGoogleFontImportUrl from './buildGoogleFontImportUrl.js';

const buildGoogleFontsCss = (moduleOptions) => {
  const safeOptions = moduleOptions || {};
  const importUrl = buildGoogleFontImportUrl(safeOptions.googleFonts);
  const importLine = importUrl ? `@import url("${importUrl}");` : '';
  const overrideCss = buildFontVariableOverrideCss(safeOptions);
  return [importLine, overrideCss].filter(Boolean).join('\n');
};

export default buildGoogleFontsCss;
