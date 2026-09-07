import buildSocialLinkItemMarkup from '../interactiveComponents/buildSocialLinkItemMarkup.js';

const buildMarketingSocialLinksRecord = (networkNames) => ({
  type: 'db-social-links',
  components: networkNames.map((networkName) => buildSocialLinkItemMarkup(networkName)).join(''),
});

export default buildMarketingSocialLinksRecord;
