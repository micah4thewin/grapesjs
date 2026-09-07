import resolveStorageKey from './resolveStorageKey.js';

const buildSnapshotOwnerKey = (editor, moduleOptions) => resolveStorageKey(editor, moduleOptions) + ':owner';

export default buildSnapshotOwnerKey;
