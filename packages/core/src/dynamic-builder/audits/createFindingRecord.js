const createFindingRecord = (severity, group, message, hint) => ({
  severity,
  group,
  message,
  hint: hint || '',
});

export default createFindingRecord;
