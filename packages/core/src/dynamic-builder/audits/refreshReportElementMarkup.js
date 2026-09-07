import buildElementFromMarkup from '../support/buildElementFromMarkup.js';

const refreshReportElementMarkup = (reportElement, freshMarkup, focusSelector) => {
  const freshElement = buildElementFromMarkup(reportElement.ownerDocument, freshMarkup);
  if (!freshElement) return reportElement;
  reportElement.innerHTML = freshElement.innerHTML;
  const focusTarget = focusSelector ? reportElement.querySelector(focusSelector) : null;
  if (focusTarget && focusTarget.focus) focusTarget.focus();
  return reportElement;
};

export default refreshReportElementMarkup;
