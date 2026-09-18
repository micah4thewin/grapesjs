// Revisions share one copy of each picture now, so a full quota almost always
// means the pictures themselves, not the number of saves.
const getStorageFullMessage = () =>
  'Browser storage is full. Remove pictures you no longer use, or delete saved revisions, to free space.';

export default getStorageFullMessage;
