import buildCodeCardChildren from './buildCodeCardChildren.js';
import getCodePreviewLine from './getCodePreviewLine.js';

const buildCssCardChildren = (cssCode) =>
  buildCodeCardChildren({
    iconName: 'styles',
    titleText: 'Custom CSS',
    previewText: getCodePreviewLine(cssCode, 'No CSS rules yet'),
    noteText: 'Applies page-wide through the export stylesheet registry. This card never ships to the published site.',
  });

export default buildCssCardChildren;
