import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSiteIdentityRecord = (editor) => {
  const storedValue = getSiteMetaRecord(editor).identity;
  const storedRecord = isPlainRecord(storedValue) ? storedValue : {};
  return {
    siteName: String(storedRecord.siteName || ''),
    tagline: String(storedRecord.tagline || ''),
    description: String(storedRecord.description || ''),
    logoSrc: String(storedRecord.logoSrc || ''),
    brandColor: String(storedRecord.brandColor || '#4f46e5'),
    moodId: String(storedRecord.moodId || 'minimal'),
  };
};

export default getSiteIdentityRecord;
