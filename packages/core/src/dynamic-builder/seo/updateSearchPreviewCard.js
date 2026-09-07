import setSeoPreviewSlotText from './setSeoPreviewSlotText.js';
import truncateTextToLimit from './truncateTextToLimit.js';

const updateSearchPreviewCard = (rootElement, previewValues) => {
  setSeoPreviewSlotText(rootElement, 'siteName', previewValues.siteNameText || previewValues.domainText || '');
  setSeoPreviewSlotText(rootElement, 'url', previewValues.urlText || 'Set the site address under Site defaults');
  setSeoPreviewSlotText(rootElement, 'title', truncateTextToLimit(previewValues.titleText, 60));
  setSeoPreviewSlotText(
    rootElement,
    'description',
    truncateTextToLimit(previewValues.descriptionText, 160) || 'Add a meta description to control this text.',
  );
};

export default updateSearchPreviewCard;
