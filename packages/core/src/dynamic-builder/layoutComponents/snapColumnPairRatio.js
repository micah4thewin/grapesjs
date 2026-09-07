const snapColumnPairRatio = (pairRatio, snapDistance = 0.02) => {
  const snapTargets = [0.5, 1 / 3, 2 / 3, 0.6, 0.4, 1 / 3.5, 2.5 / 3.5, 0.25, 0.75];
  const nearestTarget = snapTargets.find((targetRatio) => Math.abs(targetRatio - pairRatio) <= snapDistance);
  return nearestTarget === undefined ? pairRatio : nearestTarget;
};

export default snapColumnPairRatio;
