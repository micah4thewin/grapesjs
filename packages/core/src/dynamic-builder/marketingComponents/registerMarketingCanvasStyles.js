import registerCanvasStyles from '../support/registerCanvasStyles.js';
import buildCardMarketingCss from './buildCardMarketingCss.js';
import buildContactMarketingCss from './buildContactMarketingCss.js';
import buildFeaturesMarketingCss from './buildFeaturesMarketingCss.js';
import buildFooterMarketingCss from './buildFooterMarketingCss.js';
import buildHeroMarketingCss from './buildHeroMarketingCss.js';
import buildLogoCloudMarketingCss from './buildLogoCloudMarketingCss.js';
import buildPricingMarketingCss from './buildPricingMarketingCss.js';
import buildSocialRowMarketingCss from './buildSocialRowMarketingCss.js';
import buildStatsMarketingCss from './buildStatsMarketingCss.js';
import buildTeamMemberMarketingCss from './buildTeamMemberMarketingCss.js';
import buildTestimonialMarketingCss from './buildTestimonialMarketingCss.js';

const registerMarketingCanvasStyles = (editor, moduleOptions) => {
  const extraCssText = typeof (moduleOptions && moduleOptions.extraCss) === 'string' ? moduleOptions.extraCss : '';
  const marketingCssText = [
    buildHeroMarketingCss(),
    buildFeaturesMarketingCss(),
    buildCardMarketingCss(),
    buildTestimonialMarketingCss(),
    buildLogoCloudMarketingCss(),
    buildStatsMarketingCss(),
    buildPricingMarketingCss(),
    buildSocialRowMarketingCss(),
    buildTeamMemberMarketingCss(),
    buildContactMarketingCss(),
    buildFooterMarketingCss(),
    extraCssText,
  ].join('\n');
  registerCanvasStyles(editor, 'db-css-marketing-base', marketingCssText);
};

export default registerMarketingCanvasStyles;
