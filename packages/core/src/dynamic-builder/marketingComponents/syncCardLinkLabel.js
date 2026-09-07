import findDescendantByField from './findDescendantByField.js';
import readComponentLiveText from './readComponentLiveText.js';

const syncCardLinkLabel = (cardComponent) => {
  const titleComponent = findDescendantByField(cardComponent, 'title');
  const linkComponent = findDescendantByField(cardComponent, 'link');
  if (!titleComponent || !linkComponent) return;
  const titleText = readComponentLiveText(titleComponent);
  if (!titleText) return;
  const nextLabel = 'Read more: ' + titleText;
  if (linkComponent.getAttributes()['aria-label'] !== nextLabel)
    linkComponent.addAttributes({ 'aria-label': nextLabel });
};

export default syncCardLinkLabel;
