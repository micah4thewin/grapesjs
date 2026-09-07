import describeAssetFileName from './describeAssetFileName.js';

const describeLinkRecord = (linkRecord) => {
  const record = linkRecord || {};
  const href = String(record.href || '');
  if (record.kind === 'none' || !href || href === '#') return 'Not linked yet: nothing happens when clicked.';
  if (record.kind === 'page') return `Opens ${href}`;
  if (record.kind === 'email') return `Opens the email app for ${record.address || href}`;
  if (record.kind === 'phone') return `Starts a call to ${record.address || href}`;
  if (record.kind === 'file') return `Opens the file ${describeAssetFileName(href)}`;
  return `Opens ${href}`;
};

export default describeLinkRecord;
