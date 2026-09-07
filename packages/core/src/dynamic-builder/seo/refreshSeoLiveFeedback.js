import refreshSeoCounters from './refreshSeoCounters.js';
import refreshSeoDirtyNote from './refreshSeoDirtyNote.js';
import refreshSeoFieldErrors from './refreshSeoFieldErrors.js';
import refreshSeoPreviews from './refreshSeoPreviews.js';

const refreshSeoLiveFeedback = (editor, rootElement, options = {}) => {
  const { siteValues, previewValues } = refreshSeoPreviews(editor, rootElement);
  refreshSeoCounters(rootElement, previewValues);
  refreshSeoDirtyNote(rootElement);
  return refreshSeoFieldErrors(rootElement, siteValues, options);
};

export default refreshSeoLiveFeedback;
