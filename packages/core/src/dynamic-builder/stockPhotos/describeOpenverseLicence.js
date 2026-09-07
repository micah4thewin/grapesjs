const publicDomainLabels = { cc0: 'CC0 (public domain)', pdm: 'Public domain mark' };

const describeOpenverseLicence = (licenceCode, licenceVersion) => {
  const normalizedCode = String(licenceCode || '')
    .trim()
    .toLowerCase();
  if (!normalizedCode) return 'Open licence';
  if (publicDomainLabels[normalizedCode]) return publicDomainLabels[normalizedCode];
  const versionText = String(licenceVersion || '').trim();
  const codeText = normalizedCode.split('-').join(' ').toUpperCase();
  return versionText ? 'CC ' + codeText + ' ' + versionText : 'CC ' + codeText;
};

export default describeOpenverseLicence;
