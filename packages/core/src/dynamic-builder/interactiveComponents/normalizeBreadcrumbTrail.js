import escapeHtmlText from '../support/escapeHtmlText.js';
import lockInteractiveInnerParts from './lockInteractiveInnerParts.js';
import readBreadcrumbStepRecords from './readBreadcrumbStepRecords.js';

const normalizeBreadcrumbTrail = (breadcrumbComponent) => {
  readBreadcrumbStepRecords(breadcrumbComponent).forEach((stepRecord) => {
    const { itemComponent, linkComponent, labelText, isCurrent } = stepRecord;
    if (isCurrent) {
      if (linkComponent) itemComponent.components(escapeHtmlText(labelText));
      if (itemComponent.getAttributes()['aria-current'] !== 'page')
        itemComponent.addAttributes({ 'aria-current': 'page' });
      return;
    }
    if (itemComponent.getAttributes()['aria-current'] !== undefined) itemComponent.removeAttributes(['aria-current']);
    if (!linkComponent) itemComponent.components(`<a href="#">${escapeHtmlText(labelText)}</a>`);
  });
  lockInteractiveInnerParts(breadcrumbComponent);
};

export default normalizeBreadcrumbTrail;
