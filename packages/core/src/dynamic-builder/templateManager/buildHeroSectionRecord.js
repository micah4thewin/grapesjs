import buildHeroDefaultChildren from '../marketingComponents/buildHeroDefaultChildren.js';
import buildTemplateButtonGroupRecord from './buildTemplateButtonGroupRecord.js';

const markPlaceholder = (textRecord, textValue) => ({
  ...textRecord,
  attributes: { ...(textRecord.attributes || {}), 'data-db-placeholder': 'true' },
  components: textValue,
});

const buildHeroSectionRecord = (heroCopyRecord) => {
  const heroChildren = buildHeroDefaultChildren();
  const innerRecord = heroChildren[0];
  const copyRecord = innerRecord.components[0];
  const [eyebrowRecord, titleRecord, leadRecord] = copyRecord.components;
  const buttonAlign = heroCopyRecord.layoutName === 'centered' ? 'center' : 'start';
  copyRecord.components = [
    markPlaceholder(eyebrowRecord, heroCopyRecord.eyebrowText),
    markPlaceholder(titleRecord, heroCopyRecord.titleText),
    markPlaceholder(leadRecord, heroCopyRecord.leadText),
    buildTemplateButtonGroupRecord(heroCopyRecord.buttonRecords, buttonAlign),
  ];
  return {
    type: 'db-hero',
    attributes: {
      'data-db-hero': heroCopyRecord.layoutName || 'split-media-right',
      'data-db-media': heroCopyRecord.mediaName || 'image',
      'data-db-theme': heroCopyRecord.themeName || 'default',
      ...(heroCopyRecord.anchorId ? { id: heroCopyRecord.anchorId } : {}),
    },
    components: heroChildren,
  };
};

export default buildHeroSectionRecord;
