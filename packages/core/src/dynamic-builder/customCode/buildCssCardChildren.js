import buildCodeCardChildren from './buildCodeCardChildren.js';
import getCodePreviewLine from './getCodePreviewLine.js';

const buildCssCardChildren = (cssCode) =>
  buildCodeCardChildren({
    iconName: 'styles',
    titleText: 'Custom CSS',
    previewText: getCodePreviewLine(cssCode, 'No CSS rules yet'),
    noteText: 'Applies to every page of the site through the stylesheet. This card never ships to the published site.',
  });

export default buildCssCardChildren;
