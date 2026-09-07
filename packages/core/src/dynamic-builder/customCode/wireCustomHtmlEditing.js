import getIconMarkup from '../support/getIconMarkup.js';
import openCustomHtmlEditor from './openCustomHtmlEditor.js';

const toolbarMarker = 'data-db-custom-html-toolbar';

const wireCustomHtmlEditing = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
    if (selectedComponent.get('type') !== 'db-custom-html') return;
    const toolbarItems = [...(selectedComponent.get('toolbar') || [])];
    if (
      toolbarItems.some(
        (toolbarEntry) => toolbarEntry && toolbarEntry.attributes && toolbarEntry.attributes[toolbarMarker],
      )
    ) {
      return;
    }
    toolbarItems.unshift({
      attributes: { title: 'Edit HTML', [toolbarMarker]: 'true' },
      label: getIconMarkup('code', { size: 15, label: 'Edit HTML' }),
      command: 'db:edit-custom-html',
    });
    selectedComponent.set('toolbar', toolbarItems, { avoidStore: true });
  });
  editor.on('canvas:frame:load:body', ({ window: frameWindow }) => {
    const bodyElement = frameWindow && frameWindow.document && frameWindow.document.body;
    if (!bodyElement || bodyElement.dataset.dbCustomHtmlWired === 'true') return;
    bodyElement.dataset.dbCustomHtmlWired = 'true';
    bodyElement.addEventListener('dblclick', (clickEvent) => {
      const hostElement = clickEvent.target.closest && clickEvent.target.closest('[data-db-type="custom-html"]');
      const hostView = hostElement && hostElement.__gjsv;
      if (!hostView || !hostView.model) return;
      clickEvent.preventDefault();
      editor.select(hostView.model);
      openCustomHtmlEditor(editor, hostView.model);
    });
    bodyElement.addEventListener('click', (clickEvent) => {
      const linkElement = clickEvent.target.closest && clickEvent.target.closest('[data-db-open-custom-code]');
      if (!linkElement) return;
      clickEvent.preventDefault();
      editor.runCommand('db:open-custom-code');
    });
  });
};

export default wireCustomHtmlEditing;
