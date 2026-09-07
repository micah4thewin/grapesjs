import createTemporaryComponents from './createTemporaryComponents.js';

const renderTemplatePreviewHtml = (editor, contentRecords) =>
  createTemporaryComponents(editor, contentRecords)
    .map((componentModel) => componentModel.toHTML())
    .join('');

export default renderTemplatePreviewHtml;
