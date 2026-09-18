import buildAssetDigest from './buildAssetDigest.js';

const buildPooledAssetToken = (assetText) => 'db-pooled-asset:' + buildAssetDigest(assetText);

export default buildPooledAssetToken;
