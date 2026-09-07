import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from '../persistence/readStoredJsonRecord.js';
import resolvePersistenceOptions from '../persistence/resolvePersistenceOptions.js';

const hasStoredProjectSnapshot = (editor, pluginOptions) => {
  const persistenceOptions = resolvePersistenceOptions(pluginOptions, editor);
  const storedSnapshot = readStoredJsonRecord(persistenceOptions.storageKey);
  return isPlainRecord(storedSnapshot) && isPlainRecord(storedSnapshot.projectData);
};

export default hasStoredProjectSnapshot;
