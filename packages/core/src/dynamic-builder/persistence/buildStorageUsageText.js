import formatByteSizeText from '../support/formatByteSizeText.js';
import measureStorageUsageBytes from './measureStorageUsageBytes.js';

const buildStorageUsageText = (editor, moduleOptions) => {
  const usedBytes = measureStorageUsageBytes(editor, moduleOptions);
  const budgetBytes = 5 * 1024 * 1024;
  const usedShare = Math.min(1, usedBytes / budgetBytes);
  const noteText = usedShare > 0.8 ? ' Remove pictures you no longer use to keep autosave working.' : '';
  return 'Using ' + formatByteSizeText(usedBytes) + ' of about 5 MB of browser storage.' + noteText;
};

export default buildStorageUsageText;
