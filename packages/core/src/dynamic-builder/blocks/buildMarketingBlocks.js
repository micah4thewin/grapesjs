import buildMarketingCardBlocks from './buildMarketingCardBlocks.js';
import buildMarketingSectionBlocks from './buildMarketingSectionBlocks.js';

const buildMarketingBlocks = () => [...buildMarketingSectionBlocks(), ...buildMarketingCardBlocks()];

export default buildMarketingBlocks;
