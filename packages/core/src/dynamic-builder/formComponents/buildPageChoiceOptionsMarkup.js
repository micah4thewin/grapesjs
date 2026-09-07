import escapeHtmlText from '../support/escapeHtmlText.js';
import resolvePageFileName from '../support/resolvePageFileName.js';

const buildPageChoiceOptionsMarkup = (editor, currentValue) => {
  const pageOptions = editor.Pages.getAll().map((pageModel) => ({
    value: resolvePageFileName(editor, pageModel) + '.html',
    label: String(pageModel.getName() || '').trim() || 'Home',
  }));
  const hasMatchingPage = pageOptions.some((pageOption) => pageOption.value === currentValue);
  return [
    '<option value="">Not set</option>',
    ...pageOptions.map(
      (pageOption) =>
        `<option value="${escapeHtmlText(pageOption.value)}"${pageOption.value === currentValue ? ' selected' : ''}>${escapeHtmlText(pageOption.label)}</option>`,
    ),
    `<option value="__custom__"${currentValue && !hasMatchingPage ? ' selected' : ''}>A web address I type</option>`,
  ].join('');
};

export default buildPageChoiceOptionsMarkup;
