import registerCanvasStyles from '../support/registerCanvasStyles.js';
import getBrandSectionButtonCss from './getBrandSectionButtonCss.js';
import getCompositionElementCss from './getCompositionElementCss.js';
import getSectionAlignmentCss from './getSectionAlignmentCss.js';

const registerBlockCompositionStyles = (editor) => {
  const compositionCss = [getCompositionElementCss(), getSectionAlignmentCss(), getBrandSectionButtonCss()].join('\n');
  registerCanvasStyles(editor, 'db-css-blocks-compositions', compositionCss);
};

export default registerBlockCompositionStyles;
