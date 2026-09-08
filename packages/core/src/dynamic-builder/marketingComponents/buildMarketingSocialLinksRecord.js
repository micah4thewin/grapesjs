import buildSocialLinkChild from '../interactiveComponents/buildSocialLinkChild.js';

// The social links component takes child records, not markup, so the items
// are handed over as an array; joining them into a string printed
// "[object Object]" in every footer.
const buildMarketingSocialLinksRecord = (networkNames) => ({
  type: 'db-social-links',
  components: networkNames.map((networkName) => buildSocialLinkChild(networkName)),
});

export default buildMarketingSocialLinksRecord;
