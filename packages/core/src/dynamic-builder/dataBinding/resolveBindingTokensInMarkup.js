import getDataSourceRegistry from './getDataSourceRegistry.js';
import replaceBindingTokensInText from './replaceBindingTokensInText.js';
import stripFailingConditionalMarkup from './stripFailingConditionalMarkup.js';
import stripRepeaterArtifactsInMarkup from './stripRepeaterArtifactsInMarkup.js';

const resolveBindingTokensInMarkup = (editor, htmlString) => {
  const expandedMarkup = stripRepeaterArtifactsInMarkup(editor, String(htmlString == null ? '' : htmlString));
  const conditionedMarkup = stripFailingConditionalMarkup(editor, expandedMarkup);
  return replaceBindingTokensInText(getDataSourceRegistry(editor), conditionedMarkup);
};

export default resolveBindingTokensInMarkup;
