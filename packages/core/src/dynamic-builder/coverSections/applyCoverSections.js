import buildCoverSectionCss from './buildCoverSectionCss.js';
import buildCoverTypeDefinition from './buildCoverTypeDefinition.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import watchCoverAttributeUpdates from './watchCoverAttributeUpdates.js';

const applyCoverSections = (editor) => {
  registerComponentTypeSet(editor, [buildCoverTypeDefinition('image'), buildCoverTypeDefinition('video')]);
  registerCanvasStyles(editor, 'db-css-cover-base', buildCoverSectionCss());
  watchCoverAttributeUpdates(editor);
};

export default applyCoverSections;
