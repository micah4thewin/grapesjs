import buildAnchorTraitDefinition from './buildAnchorTraitDefinition.js';
import buildMarketingLookTraitDefinition from './buildMarketingLookTraitDefinition.js';

const buildMarketingSectionTraits = (defaultLook, anchorPlaceholder) => [
  buildMarketingLookTraitDefinition(defaultLook),
  { type: 'db-asset', name: 'data-db-bg-image', label: 'Background photo' },
  buildAnchorTraitDefinition(anchorPlaceholder),
];

export default buildMarketingSectionTraits;
