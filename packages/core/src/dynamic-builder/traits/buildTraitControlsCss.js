import buildTraitLinkIconCss from './buildTraitLinkIconCss.js';
import buildTraitSliderAssetCss from './buildTraitSliderAssetCss.js';

const buildTraitControlsCss = () => [buildTraitSliderAssetCss(), buildTraitLinkIconCss()].join('\n');

export default buildTraitControlsCss;
