const editorOnlyAttributePattern =
  /\s(?:data-gjs-[a-zA-Z0-9_-]+|data-db-editor-[a-zA-Z0-9_-]+|contenteditable|draggable)(?:=(?:"[^"]*"|'[^']*'|[^\s>]*))?(?=[\s>\/])/g;

const stripEditorOnlyAttributes = (markupText) =>
  String(markupText == null ? '' : markupText).replace(/<[a-zA-Z][^>]*>/g, (tagMarkup) =>
    tagMarkup.replace(editorOnlyAttributePattern, ''),
  );

export default stripEditorOnlyAttributes;
