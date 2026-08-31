const isPlainRecord = (candidateValue) =>
  !!candidateValue && typeof candidateValue === 'object' && !Array.isArray(candidateValue);

export default isPlainRecord;
