import { getPooledTokenPattern } from './getPooledAssetPatterns.js';

const listPooledTokensInText = (sourceText) => new Set(String(sourceText || '').match(getPooledTokenPattern()) || []);

export default listPooledTokensInText;
