import handleSeoModalClick from './handleSeoModalClick.js';
import refreshSeoCounters from './refreshSeoCounters.js';
import refreshSeoPreviews from './refreshSeoPreviews.js';
import toSlugText from '../support/toSlugText.js';

const wireSeoModalEvents = (editor, rootElement) => {
  const refreshLiveFeedback = () => {
    refreshSeoCounters(rootElement);
    refreshSeoPreviews(editor, rootElement);
  };
  rootElement.addEventListener('click', (clickEvent) => handleSeoModalClick(editor, rootElement, clickEvent));
  rootElement.addEventListener('input', refreshLiveFeedback);
  rootElement.addEventListener('change', refreshLiveFeedback);
  const slugInputElement = rootElement.querySelector('[data-db-seo-field="slug"]');
  if (slugInputElement) {
    slugInputElement.addEventListener('blur', () => {
      slugInputElement.value = toSlugText(slugInputElement.value);
      refreshLiveFeedback();
    });
  }
  refreshLiveFeedback();
};

export default wireSeoModalEvents;
