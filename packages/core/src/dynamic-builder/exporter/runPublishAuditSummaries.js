const runPublishAuditSummaries = (editor) => {
  const auditDefinitions = [
    { auditId: 'accessibility', auditLabel: 'Accessibility', commandId: 'db:run-accessibility-audit' },
    { auditId: 'performance', auditLabel: 'Performance', commandId: 'db:run-performance-audit' },
    { auditId: 'seo', auditLabel: 'SEO', commandId: 'db:run-seo-audit' },
  ];
  return auditDefinitions.map((auditDefinition) => {
    const commandsModule = editor.Commands;
    const commandAvailable = commandsModule && commandsModule.has && commandsModule.has(auditDefinition.commandId);
    const commandResult = commandAvailable ? editor.runCommand(auditDefinition.commandId) : [];
    const findings = Array.isArray(commandResult) ? commandResult : [];
    const severityCounts = { error: 0, warning: 0, info: 0 };
    findings.forEach((findingRecord) => {
      const severityValue = findingRecord && findingRecord.severity;
      if (severityCounts[severityValue] !== undefined) severityCounts[severityValue] += 1;
    });
    return { ...auditDefinition, severityCounts, findingCount: findings.length, commandAvailable: !!commandAvailable };
  });
};

export default runPublishAuditSummaries;
