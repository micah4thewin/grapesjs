import snapColumnPairRatio from './snapColumnPairRatio.js';

const resolveColumnPairWidths = (startWidths, gutterIndex, deltaX) => {
  const pairTotal = startWidths[gutterIndex] + startWidths[gutterIndex + 1];
  const minimumWidth = pairTotal * 0.15;
  const rawLeftWidth = Math.min(pairTotal - minimumWidth, Math.max(minimumWidth, startWidths[gutterIndex] + deltaX));
  const leftWidth = snapColumnPairRatio(rawLeftWidth / pairTotal) * pairTotal;
  const nextWidths = [...startWidths];
  nextWidths[gutterIndex] = leftWidth;
  nextWidths[gutterIndex + 1] = pairTotal - leftWidth;
  return nextWidths;
};

export default resolveColumnPairWidths;
