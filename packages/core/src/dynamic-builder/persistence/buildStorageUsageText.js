import formatByteSizeText from '../support/formatByteSizeText.js';
import measureStorageUsageBytes from './measureStorageUsageBytes.js';

const buildStorageUsageText = (moduleOptions) => {
  const usedBytes = measureStorageUsageBytes(moduleOptions);
  const budgetBytes = 5 * 1024 * 1024;
  const usedShare = Math.min(1, usedBytes / budgetBytes);
  const noteText = usedShare > 0.8 ? ' Delete old revisions to keep autosave working.' : '';
  return 'Using ' + formatByteSizeText(usedBytes) + ' of about 5 MB of browser storage.' + noteText;
};

export default buildStorageUsageText;
