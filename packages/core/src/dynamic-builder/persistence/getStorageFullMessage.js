// With the pictures in IndexedDB this is now the browser's own limit for the
// whole site, not the small localStorage budget, so freeing space means
// dropping pictures rather than trimming the number of saves.
const getStorageFullMessage = () =>
  'Browser storage is full. Remove pictures you no longer use, or delete saved revisions, to free space.';

export default getStorageFullMessage;
