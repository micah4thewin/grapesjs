import buildThemeTokenDeclarations from './buildThemeTokenDeclarations.js';
import getSectionThemeRecord from './getSectionThemeRecord.js';

const buildThemeTokenCss = (baseSelector, extraSelectorsByTheme = {}) => {
  const themeRecord = getSectionThemeRecord();
  return Object.keys(themeRecord)
    .map((themeKey) => {
      const selectorList = [`${baseSelector}[data-db-theme=${themeKey}]`, ...(extraSelectorsByTheme[themeKey] || [])];
      const declarations = `background-color: ${themeRecord[themeKey].background}; ${buildThemeTokenDeclarations(themeKey)}`;
      return `${selectorList.join(', ')} { ${declarations} }`;
    })
    .join('\n');
};

export default buildThemeTokenCss;
