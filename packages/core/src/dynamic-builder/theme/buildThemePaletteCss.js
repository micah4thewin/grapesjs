import buildLightPaletteCssDeclarations from './buildLightPaletteCssDeclarations.js';
import buildDarkPaletteCssDeclarations from './buildDarkPaletteCssDeclarations.js';

const buildThemePaletteCss = () => `
.gjs-editor-cont,
[data-theme='light'] .gjs-editor-cont:not([data-theme='dark']),
.gjs-editor-cont[data-theme='light'] {
${buildLightPaletteCssDeclarations()}
}
@media (prefers-color-scheme: dark) {
  .gjs-editor-cont:not([data-theme='light']) {
${buildDarkPaletteCssDeclarations()}
  }
}
[data-theme='dark'] .gjs-editor-cont:not([data-theme='light']),
.gjs-editor-cont[data-theme='dark'] {
${buildDarkPaletteCssDeclarations()}
}
`;

export default buildThemePaletteCss;
