import buildSocialLinkChild from './buildSocialLinkChild.js';

const buildSocialLinkChildren = () =>
  ['x', 'facebook', 'instagram', 'linkedin', 'youtube', 'github'].map((networkName) =>
    buildSocialLinkChild(networkName),
  );

export default buildSocialLinkChildren;
