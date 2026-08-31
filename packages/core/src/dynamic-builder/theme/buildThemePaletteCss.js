import buildLightPaletteCssDeclarations from './buildLightPaletteCssDeclarations.js';
import buildDarkPaletteCssDeclarations from './buildDarkPaletteCssDeclarations.js';

const buildThemePaletteCss = () => `
.gjs-editor-cont {
${buildLightPaletteCssDeclarations()}
}
@media (prefers-color-scheme: dark) {
  .gjs-editor-cont:not([data-theme='light']) {
${buildDarkPaletteCssDeclarations()}
  }
}
[data-theme='light'] .gjs-editor-cont:not([data-theme='dark']) {
${buildLightPaletteCssDeclarations()}
}
[data-theme='dark'] .gjs-editor-cont:not([data-theme='light']) {
${buildDarkPaletteCssDeclarations()}
}
.gjs-editor-cont[data-theme='light'] {
${buildLightPaletteCssDeclarations()}
}
.gjs-editor-cont[data-theme='dark'] {
${buildDarkPaletteCssDeclarations()}
}
`;

export default buildThemePaletteCss;
