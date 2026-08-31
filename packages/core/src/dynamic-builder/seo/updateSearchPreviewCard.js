import setSeoPreviewSlotText from './setSeoPreviewSlotText.js';

const updateSearchPreviewCard = (rootElement, previewValues) => {
  setSeoPreviewSlotText(rootElement, 'url', previewValues.urlText);
  setSeoPreviewSlotText(rootElement, 'title', previewValues.titleText);
  setSeoPreviewSlotText(
    rootElement,
    'description',
    previewValues.descriptionText || 'Add a meta description to control this text.',
  );
};

export default updateSearchPreviewCard;
