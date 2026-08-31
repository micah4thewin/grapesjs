import deepMergeRecords from '../support/deepMergeRecords.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import buildColumnsLayoutCss from './buildColumnsLayoutCss.js';
import buildContainerLayoutCss from './buildContainerLayoutCss.js';
import buildSectionLayoutCss from './buildSectionLayoutCss.js';
import buildSpacerDividerCss from './buildSpacerDividerCss.js';

const registerLayoutCanvasStyles = (editor, moduleOptions) => {
  const containerWidthRecord = deepMergeRecords(
    { narrow: '46rem', contained: '72rem', wide: '88rem' },
    (moduleOptions && moduleOptions.containerWidths) || {},
  );
  const layoutCssText = [
    buildSectionLayoutCss(),
    buildContainerLayoutCss(containerWidthRecord),
    buildColumnsLayoutCss(),
    buildSpacerDividerCss(),
  ].join('\n');
  registerCanvasStyles(editor, 'db-css-layout-base', layoutCssText);
};

export default registerLayoutCanvasStyles;
