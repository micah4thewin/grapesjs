import findClosestComponentOfType from './findClosestComponentOfType.js';
import syncCardLinkLabel from './syncCardLinkLabel.js';
import syncContactAttributesFromText from './syncContactAttributesFromText.js';
import syncPortraitAltFromName from './syncPortraitAltFromName.js';

const watchMarketingTextEdits = (editor) => {
  editor.on('rte:disable', (textView) => {
    const textComponent = textView && textView.model;
    if (!textComponent || !textComponent.getAttributes) return;
    const fieldName = String(textComponent.getAttributes()['data-db-field'] || '');
    if (!fieldName) return;
    const cardComponent = findClosestComponentOfType(textComponent, 'db-card');
    if (cardComponent && fieldName === 'title') syncCardLinkLabel(cardComponent);
    const personComponent =
      findClosestComponentOfType(textComponent, 'db-testimonial') ||
      findClosestComponentOfType(textComponent, 'db-team-member');
    if (personComponent && fieldName === 'name') syncPortraitAltFromName(personComponent);
    const contactComponent = findClosestComponentOfType(textComponent, 'db-contact');
    if (contactComponent) syncContactAttributesFromText(contactComponent);
  });
};

export default watchMarketingTextEdits;
