import buildListRowMarkup from './buildListRowMarkup.js';
import buildPagePickerOptionsMarkup from './buildPagePickerOptionsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import readBreadcrumbStepRecords from './readBreadcrumbStepRecords.js';

const buildBreadcrumbRowsMarkup = (breadcrumbComponent, editor) => {
  const stepRecords = readBreadcrumbStepRecords(breadcrumbComponent);
  if (!stepRecords.length) return '<p class="gjs-db-muted">No steps yet. Add the first one below.</p>';
  return stepRecords
    .map((stepRecord, stepIndex) => {
      const labelInput = `<input class="gjs-db-field-input" data-db-list-field="label" value="${escapeHtmlText(stepRecord.labelText)}" placeholder="Step name" aria-label="Step name">`;
      if (stepRecord.isCurrent) {
        return buildListRowMarkup(
          stepIndex,
          labelInput + '<span class="gjs-db-field-help">Current page, shown without a link</span>',
        );
      }
      return buildListRowMarkup(
        stepIndex,
        labelInput +
          `<select class="gjs-db-field-input" data-db-list-field="page" aria-label="Link to page">${buildPagePickerOptionsMarkup(editor, stepRecord.linkHref)}</select>` +
          `<input class="gjs-db-field-input" data-db-list-field="href" value="${escapeHtmlText(stepRecord.linkHref)}" placeholder="Or type a link, like #team" aria-label="Link">`,
      );
    })
    .join('');
};

export default buildBreadcrumbRowsMarkup;
