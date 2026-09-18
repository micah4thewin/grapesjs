// Small JSON records (the snapshot, the revision list, saved fonts) live apart
// from the picture bytes so a record read never drags the pictures in with it.
export const recordStoreName = 'records';

export const assetStoreName = 'assets';

export const databaseName = 'db-dynamic-builder';

export const databaseVersion = 1;
