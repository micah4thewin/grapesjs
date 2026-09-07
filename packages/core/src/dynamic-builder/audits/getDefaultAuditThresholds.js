const getDefaultAuditThresholds = () => ({
  minWordCount: 150,
  minTargetSizePx: 24,
  recommendedTargetSizePx: 44,
  maxDomNodes: 1500,
  criticalDomNodes: 3000,
  maxNestingDepth: 14,
  maxIframes: 3,
  maxFindingsPerCheck: 8,
  lazyImageCountTrigger: 10,
  minAltCoverageRatio: 0.9,
});

export default getDefaultAuditThresholds;
