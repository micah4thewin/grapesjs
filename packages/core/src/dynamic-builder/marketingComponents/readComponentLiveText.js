import readComponentPlainText from './readComponentPlainText.js';

const readComponentLiveText = (component) => {
  const liveElement = component && component.getEl ? component.getEl() : null;
  if (liveElement && typeof liveElement.textContent === 'string') return liveElement.textContent.trim();
  return readComponentPlainText(component);
};

export default readComponentLiveText;
