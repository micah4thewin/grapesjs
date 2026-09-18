import formatByteSizeText from '../support/formatByteSizeText.js';
import measureStorageUsageBytes from './measureStorageUsageBytes.js';

// Pictures live in IndexedDB now, so the old fixed 5 MB line would understate
// the room available by a wide margin. The browser is asked instead.
const buildStorageUsageText = async () => {
  const { usedBytes, quotaBytes } = await measureStorageUsageBytes();
  if (quotaBytes <= 0) return 'Using ' + formatByteSizeText(usedBytes) + ' of browser storage.';
  const noteText = usedBytes / quotaBytes > 0.8 ? ' Remove pictures you no longer use to keep autosave working.' : '';
  return (
    'Using ' +
    formatByteSizeText(usedBytes) +
    ' of the ' +
    formatByteSizeText(quotaBytes) +
    ' this browser allows.' +
    noteText
  );
};

export default buildStorageUsageText;
