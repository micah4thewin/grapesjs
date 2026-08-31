const runAuditChecks = (auditChecks, auditContext) => {
  const collectedFindings = [];
  auditChecks.forEach((auditCheck) => {
    try {
      const checkFindings = auditCheck(auditContext);
      Array.isArray(checkFindings) &&
        checkFindings.forEach((findingRecord) => findingRecord && collectedFindings.push(findingRecord));
    } catch (checkError) {
      console.error('dynamic-builder audit check failed', checkError);
    }
  });
  return collectedFindings;
};

export default runAuditChecks;
