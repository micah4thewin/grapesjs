import handleSeoModalClick from './handleSeoModalClick.js';
import refreshSeoCounters from './refreshSeoCounters.js';
import refreshSeoPreviews from './refreshSeoPreviews.js';
import toSlugText from '../support/toSlugText.js';
import wireSeoModalTabKeys from './wireSeoModalTabKeys.js';

const wireSeoModalEvents = (editor, rootElement) => {
  const refreshLiveFeedback = () => {
    refreshSeoCounters(rootElement);
    refreshSeoPreviews(editor, rootElement);
  };
  rootElement.addEventListener('click', (clickEvent) => handleSeoModalClick(editor, rootElement, clickEvent));
  rootElement.addEventListener('input', refreshLiveFeedback);
  rootElement.addEventListener('change', refreshLiveFeedback);
  wireSeoModalTabKeys(rootElement);
  const slugInputElement = rootElement.querySelector('[data-db-seo-field="slug"]');
  if (slugInputElement) {
    slugInputElement.addEventListener('blur', () => {
      const cleanedSlug = toSlugText(slugInputElement.value);
      if (slugInputElement.value.trim() && !cleanedSlug) {
        slugInputElement.classList.add('gjs-db-field-invalid');
        slugInputElement.setAttribute('title', 'This slug contains no usable characters. The page name will be used.');
      } else {
        slugInputElement.classList.remove('gjs-db-field-invalid');
        slugInputElement.removeAttribute('title');
        slugInputElement.value = cleanedSlug;
      }
      refreshLiveFeedback();
    });
  }
  refreshLiveFeedback();
};

export default wireSeoModalEvents;
