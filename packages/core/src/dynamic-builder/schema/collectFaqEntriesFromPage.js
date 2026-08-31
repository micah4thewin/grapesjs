import collectComponentPlainText from './collectComponentPlainText.js';
import findComponentsInTree from './findComponentsInTree.js';

const collectFaqEntriesFromPage = (editor, page) => {
  if (!page || !page.getMainComponent) return [];
  const rootComponent = page.getMainComponent();
  if (!rootComponent) return [];
  const accordionItems = findComponentsInTree(
    rootComponent,
    (candidateComponent) => candidateComponent.get && candidateComponent.get('type') === 'db-accordion-item',
  );
  return accordionItems
    .map((itemComponent) => {
      const hasAttribute = (targetComponent, attributeName) => {
        const componentAttributes = targetComponent.getAttributes ? targetComponent.getAttributes() : {};
        return componentAttributes[attributeName] !== undefined;
      };
      const triggerComponent = findComponentsInTree(itemComponent, (candidateComponent) =>
        hasAttribute(candidateComponent, 'data-db-accordion-trigger'),
      )[0];
      const panelComponent = findComponentsInTree(itemComponent, (candidateComponent) =>
        hasAttribute(candidateComponent, 'data-db-accordion-panel'),
      )[0];
      return {
        questionText: collectComponentPlainText(triggerComponent),
        answerText: collectComponentPlainText(panelComponent),
      };
    })
    .filter((faqEntry) => faqEntry.questionText && faqEntry.answerText);
};

export default collectFaqEntriesFromPage;
