import buildPageCanonicalUrl from '../seo/buildPageCanonicalUrl.js';

const buildSchemaPageUrl = (editor, page) => (page ? buildPageCanonicalUrl(editor, page) : '');

export default buildSchemaPageUrl;
