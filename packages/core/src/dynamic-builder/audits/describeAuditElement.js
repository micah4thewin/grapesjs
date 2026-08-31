const describeAuditElement = (element) => {
  if (!element || !element.tagName) return 'element';
  const tagPart = element.tagName.toLowerCase();
  const idPart = element.id ? '#' + element.id : '';
  const classPart = element.classList && element.classList.length ? '.' + element.classList[0] : '';
  const textPart = String(element.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 30);
  const selectorPart = tagPart + idPart + classPart;
  return textPart ? selectorPart + ' ("' + textPart + '")' : selectorPart;
};

export default describeAuditElement;
