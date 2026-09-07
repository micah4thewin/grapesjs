import getSiteSeoMetaRecord from './getSiteSeoMetaRecord.js';
import trimCanonicalBaseUrl from '../seo/trimCanonicalBaseUrl.js';

const hasSiteAddress = (editor) => !!trimCanonicalBaseUrl(getSiteSeoMetaRecord(editor).canonicalBase);

export default hasSiteAddress;
