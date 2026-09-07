import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildEyebrowGroupTypeDefinition from './buildEyebrowGroupTypeDefinition.js';

const registerBlockCompositionTypes = (editor) => registerComponentTypeSet(editor, [buildEyebrowGroupTypeDefinition()]);

export default registerBlockCompositionTypes;
