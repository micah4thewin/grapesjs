const countFindingsBySeverity = (findings) => {
  const severityCounts = { error: 0, warning: 0, info: 0 };
  (Array.isArray(findings) ? findings : []).forEach((findingRecord) => {
    const severityValue = findingRecord && findingRecord.severity;
    if (severityCounts[severityValue] !== undefined) severityCounts[severityValue] += 1;
  });
  return severityCounts;
};

export default countFindingsBySeverity;
