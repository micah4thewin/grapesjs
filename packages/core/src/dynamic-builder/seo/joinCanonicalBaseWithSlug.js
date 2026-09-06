import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const joinCanonicalBaseWithSlug = (canonicalBase, slugText) => {
  const trimmedBase = trimCanonicalBaseUrl(canonicalBase);
  if (!trimmedBase) return '';
  const cleanSlug = String(slugText || '').replace(/^\/+/, '');
  if (!cleanSlug) return trimmedBase + '/';
  const encodedSlug = cleanSlug
    .split('/')
    .map((slugPart) => encodeURIComponent(slugPart))
    .join('/');
  return trimmedBase + '/' + encodedSlug;
};

export default joinCanonicalBaseWithSlug;
