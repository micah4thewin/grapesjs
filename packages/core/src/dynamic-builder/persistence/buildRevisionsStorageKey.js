import resolveStorageKey from './resolveStorageKey.js';

const buildRevisionsStorageKey = (editor, moduleOptions) => resolveStorageKey(editor, moduleOptions) + ':revisions';

export default buildRevisionsStorageKey;
