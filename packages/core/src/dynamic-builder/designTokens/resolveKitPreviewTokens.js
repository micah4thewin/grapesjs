import buildDesignKitTokenPatch from './buildDesignKitTokenPatch.js';
import deepMergeRecords from '../support/deepMergeRecords.js';

const resolveKitPreviewTokens = (baseRecord, moduleOptions, kitRecord) =>
  deepMergeRecords(baseRecord, buildDesignKitTokenPatch(moduleOptions, kitRecord ? kitRecord.tokens : {}));

export default resolveKitPreviewTokens;
