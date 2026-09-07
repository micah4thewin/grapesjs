import applyImageDimensionsFix from './applyImageDimensionsFix.js';
import demoteHeadingComponent from './demoteHeadingComponent.js';
import focusComponentTrait from './focusComponentTrait.js';
import locateAuditComponent from './locateAuditComponent.js';

const runEditorCommand = (commandId) => (editor) => {
  if (!editor.Commands || !editor.Commands.has(commandId)) return false;
  editor.runCommand(commandId);
  return true;
};

const focusTrait = (traitName) => (editor, component) => focusComponentTrait(editor, component, traitName);

const getAuditFixDefinitions = () => [
  { id: 'alt-text', label: 'Add alt text', opensPanel: true, run: focusTrait('alt') },
  { id: 'aria-label', label: 'Add accessible name', opensPanel: true, run: focusTrait('aria-label') },
  { id: 'form-action', label: 'Connect form', opensPanel: true, run: focusTrait('action') },
  { id: 'link-href', label: 'Set link', opensPanel: true, run: focusTrait('href') },
  { id: 'privacy-url', label: 'Choose privacy page', opensPanel: true, run: focusTrait('data-db-privacy-url') },
  { id: 'image-source', label: 'Choose picture', opensPanel: true, run: focusTrait('src') },
  {
    id: 'lazy-loading',
    label: 'Load lazily',
    opensPanel: false,
    run: (editor, component) => {
      if (!component || !component.addAttributes) return false;
      component.addAttributes({ loading: 'lazy', decoding: 'async' });
      return true;
    },
  },
  {
    id: 'remove-autoplay',
    label: 'Turn off autoplay',
    opensPanel: false,
    run: (editor, component) => {
      if (!component || !component.removeAttributes) return false;
      component.removeAttributes(['autoplay']);
      return true;
    },
  },
  { id: 'demote-heading', label: 'Change to h2', opensPanel: false, run: demoteHeadingComponent },
  { id: 'image-dimensions', label: 'Set width and height', opensPanel: false, run: applyImageDimensionsFix },
  {
    id: 'edit-text',
    label: 'Edit text',
    opensPanel: true,
    run: (editor, component) => locateAuditComponent(editor, component),
  },
  {
    id: 'open-schema-manager',
    label: 'Open schema manager',
    opensPanel: true,
    run: runEditorCommand('db:open-schema-manager'),
  },
  {
    id: 'open-data-sources',
    label: 'Open data sources',
    opensPanel: true,
    run: runEditorCommand('db:open-data-sources'),
  },
  {
    id: 'open-site-identity',
    label: 'Set site name',
    opensPanel: true,
    run: runEditorCommand('db:open-site-identity'),
  },
];

export default getAuditFixDefinitions;
