const updateSeoHealthChip = (editor, healthReport) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const chipElement = containerElement && containerElement.querySelector('[data-db-seo-health-chip]');
  if (!chipElement || !healthReport) return;
  chipElement.dataset.dbSeoLevel = healthReport.level;
  const scoreElement = chipElement.querySelector('[data-db-seo-health-score]');
  if (scoreElement) scoreElement.textContent = String(healthReport.score);
  const summaryText = healthReport.findings.length
    ? healthReport.findings.map((findingRecord) => findingRecord.message).join(' ')
    : 'All basic SEO settings are in place.';
  chipElement.setAttribute('title', 'SEO health ' + healthReport.score + ' of 100. ' + summaryText);
  chipElement.setAttribute('aria-label', 'SEO health ' + healthReport.score + ' of 100. Open SEO settings.');
};

export default updateSeoHealthChip;
