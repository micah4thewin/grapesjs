import handleSeoModalClick from './handleSeoModalClick.js';
import refreshSeoLiveFeedback from './refreshSeoLiveFeedback.js';
import storeSeoModalSnapshot from './storeSeoModalSnapshot.js';
import wireSeoFieldBlurNormalizers from './wireSeoFieldBlurNormalizers.js';
import wireSeoModalTabKeys from './wireSeoModalTabKeys.js';

const wireSeoModalEvents = (editor, rootElement) => {
  const refreshLiveFeedback = (options) => refreshSeoLiveFeedback(editor, rootElement, options || {});
  rootElement.addEventListener('click', (clickEvent) =>
    handleSeoModalClick(editor, rootElement, clickEvent, refreshLiveFeedback),
  );
  rootElement.addEventListener('input', () => refreshLiveFeedback());
  rootElement.addEventListener('change', () => refreshLiveFeedback());
  wireSeoFieldBlurNormalizers(rootElement, refreshLiveFeedback);
  wireSeoModalTabKeys(rootElement);
  storeSeoModalSnapshot(rootElement);
  refreshLiveFeedback();
  return refreshLiveFeedback;
};

export default wireSeoModalEvents;
