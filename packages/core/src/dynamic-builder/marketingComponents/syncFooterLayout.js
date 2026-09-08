import buildNewsletterFormRecord from '../blocks/buildNewsletterFormRecord.js';
import walkComponentTree from '../support/walkComponentTree.js';

const buildNewsletterColumnRecord = () => ({
  tagName: 'div',
  name: 'Newsletter column',
  classes: ['db-footer-newsletter'],
  attributes: { 'data-db-footer-newsletter': 'true' },
  components: [
    {
      tagName: 'span',
      type: 'text',
      name: 'Column heading',
      classes: ['db-footer-heading'],
      attributes: { 'data-db-footer-heading': 'true' },
      components: 'Stay in the loop',
    },
    {
      tagName: 'p',
      type: 'text',
      name: 'Newsletter blurb',
      classes: ['db-footer-blurb'],
      components: 'Monthly updates and practical tips. No spam, unsubscribe any time.',
    },
    buildNewsletterFormRecord('Subscribe'),
  ],
});

// Walks the models rather than the DOM so it also works before the footer is
// drawn, which is when a freshly dropped block is prepared.
const findFirst = (component, className) => {
  let foundComponent = null;
  walkComponentTree(component, (currentComponent) => {
    if (foundComponent || currentComponent === component || !currentComponent.getClasses) return;
    if (currentComponent.getClasses().indexOf(className) >= 0) foundComponent = currentComponent;
  });
  return foundComponent;
};

// The footer's Layout setting swaps between column, single-row, centered and
// newsletter arrangements. Only the newsletter one needs extra content, so the
// signup column is added or removed here instead of living hidden in the DOM.
const syncFooterLayout = (footerComponent) => {
  if (!footerComponent || typeof footerComponent.getAttributes !== 'function') return false;
  const layoutName = String((footerComponent.getAttributes() || {})['data-db-footer'] || 'columns');
  const newsletterColumn = findFirst(footerComponent, 'db-footer-newsletter');
  if (layoutName === 'newsletter') {
    if (newsletterColumn) return false;
    const gridComponent = findFirst(footerComponent, 'db-footer-grid');
    if (!gridComponent) return false;
    gridComponent.append(buildNewsletterColumnRecord());
    return true;
  }
  if (!newsletterColumn) return false;
  newsletterColumn.remove();
  return true;
};

export default syncFooterLayout;
