import watchContactComponentUpdates from './watchContactComponentUpdates.js';
import watchMarketingContentUpdates from './watchMarketingContentUpdates.js';
import watchMarketingSectionUpdates from './watchMarketingSectionUpdates.js';
import watchMarketingTextEdits from './watchMarketingTextEdits.js';
import watchPricingComponentUpdates from './watchPricingComponentUpdates.js';
import watchSiteLocaleUpdates from './watchSiteLocaleUpdates.js';
import watchStatComponentUpdates from './watchStatComponentUpdates.js';

const watchMarketingComponentUpdates = (editor) => {
  watchStatComponentUpdates(editor);
  watchPricingComponentUpdates(editor);
  watchMarketingSectionUpdates(editor);
  watchMarketingContentUpdates(editor);
  watchContactComponentUpdates(editor);
  watchMarketingTextEdits(editor);
  watchSiteLocaleUpdates(editor);
};

export default watchMarketingComponentUpdates;
