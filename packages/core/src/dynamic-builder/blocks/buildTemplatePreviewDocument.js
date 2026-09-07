import getCanvasCssRegistry from '../support/getCanvasCssRegistry.js';
import renderTemplatePreviewHtml from './renderTemplatePreviewHtml.js';

const buildTemplatePreviewDocument = (editor, contentRecords) => {
  const registeredCss = Array.from(getCanvasCssRegistry(editor).values()).join('\n');
  const previewHtml = renderTemplatePreviewHtml(editor, contentRecords);
  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8">',
    '<style>' + registeredCss + '</style>',
    '<style>html { pointer-events: none; overflow: hidden; } body { margin: 0; }</style>',
    '</head><body>' + previewHtml + '</body></html>',
  ].join('');
};

export default buildTemplatePreviewDocument;
