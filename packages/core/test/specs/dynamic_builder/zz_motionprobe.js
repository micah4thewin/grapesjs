import extractCssRuleSelectors from '../../../src/dynamic-builder/exporter/extractCssRuleSelectors';
import doesSelectorMatchDocuments from '../../../src/dynamic-builder/exporter/doesSelectorMatchDocuments';
import buildAnimationSiteCss from '../../../src/dynamic-builder/animations/buildAnimationSiteCss';

describe('probe', () => {
  test('probe', () => {
    const doc = new DOMParser().parseFromString('<p class="db-text">hi</p>', 'text/html');
    extractCssRuleSelectors(buildAnimationSiteCss()).forEach((sel) => {
      console.log(JSON.stringify(sel), doesSelectorMatchDocuments(sel, [doc]));
    });
  });
});
