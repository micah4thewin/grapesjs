const summarizeDataBindingIssues = (issuesRecord) => {
  const summaryParts = [];
  const tokenCount = issuesRecord.unresolvedTokens.length;
  const missingCount = issuesRecord.missingSources.length;
  const emptyCount = issuesRecord.emptyRepeaters.length;
  if (tokenCount) summaryParts.push(`${tokenCount} data ${tokenCount === 1 ? 'token has' : 'tokens have'} no value`);
  if (missingCount) {
    summaryParts.push(`${missingCount} ${missingCount === 1 ? 'repeater uses' : 'repeaters use'} a missing source`);
  }
  if (emptyCount) summaryParts.push(`${emptyCount} ${emptyCount === 1 ? 'repeater has' : 'repeaters have'} no items`);
  return summaryParts.join(', ');
};

export default summarizeDataBindingIssues;
