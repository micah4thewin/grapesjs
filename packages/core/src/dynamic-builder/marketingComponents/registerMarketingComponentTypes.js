import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildCardTypeDefinition from './buildCardTypeDefinition.js';
import buildContactTypeDefinition from './buildContactTypeDefinition.js';
import buildFeatureCardTypeDefinition from './buildFeatureCardTypeDefinition.js';
import buildFeaturesTypeDefinition from './buildFeaturesTypeDefinition.js';
import buildFooterTypeDefinition from './buildFooterTypeDefinition.js';
import buildHeroTypeDefinition from './buildHeroTypeDefinition.js';
import buildLogoCloudTypeDefinition from './buildLogoCloudTypeDefinition.js';
import buildPricingTierTypeDefinition from './buildPricingTierTypeDefinition.js';
import buildPricingTypeDefinition from './buildPricingTypeDefinition.js';
import buildStatTypeDefinition from './buildStatTypeDefinition.js';
import buildStatsTypeDefinition from './buildStatsTypeDefinition.js';
import buildTeamMemberTypeDefinition from './buildTeamMemberTypeDefinition.js';
import buildTestimonialTypeDefinition from './buildTestimonialTypeDefinition.js';

const registerMarketingComponentTypes = (editor) =>
  registerComponentTypeSet(editor, [
    buildFeatureCardTypeDefinition(),
    buildFeaturesTypeDefinition(),
    buildCardTypeDefinition(),
    buildTestimonialTypeDefinition(),
    buildLogoCloudTypeDefinition(),
    buildStatTypeDefinition(),
    buildStatsTypeDefinition(),
    buildPricingTierTypeDefinition(),
    buildPricingTypeDefinition(),
    buildTeamMemberTypeDefinition(),
    buildContactTypeDefinition(),
    buildFooterTypeDefinition(),
    buildHeroTypeDefinition(),
  ]);

export default registerMarketingComponentTypes;
