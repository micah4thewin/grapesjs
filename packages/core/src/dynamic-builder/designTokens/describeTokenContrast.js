import computeContrastRatio from '../support/computeContrastRatio.js';

const describeTokenContrast = (foregroundValue, backgroundValue) => {
  const ratio = computeContrastRatio(foregroundValue, backgroundValue);
  if (!ratio) return null;
  const roundedRatio = Math.round(ratio * 10) / 10;
  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'Large text only' : 'Low contrast';
  const kind = ratio >= 4.5 ? 'success' : ratio >= 3 ? 'warning' : 'error';
  return { ratio: roundedRatio, grade, kind, text: `${roundedRatio}:1 ${grade}` };
};

export default describeTokenContrast;
