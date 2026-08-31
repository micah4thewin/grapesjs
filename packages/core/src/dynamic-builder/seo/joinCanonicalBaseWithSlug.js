import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const joinCanonicalBaseWithSlug = (canonicalBase, slugText) => {
  const trimmedBase = trimCanonicalBaseUrl(canonicalBase);
  if (!trimmedBase) return '';
  const cleanSlug = String(slugText || '').replace(/^\/+/, '');
  return cleanSlug ? trimmedBase + '/' + cleanSlug : trimmedBase + '/';
};

export default joinCanonicalBaseWithSlug;
