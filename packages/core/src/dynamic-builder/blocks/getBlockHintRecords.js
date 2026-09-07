import getContentBlockHints from './getContentBlockHints.js';
import getStructureBlockHints from './getStructureBlockHints.js';

const getBlockHintRecords = () => ({ ...getStructureBlockHints(), ...getContentBlockHints() });

export default getBlockHintRecords;
