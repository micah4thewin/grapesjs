import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildStyleScopeToggleMarkup from './buildStyleScopeToggleMarkup.js';
import refreshStyleScopeToggle from './refreshStyleScopeToggle.js';
import switchStyleScope from './switchStyleScope.js';

const mountStyleScopeToggle = (editor) => {
  const renderToggle = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    const tagsElement = containerElement && containerElement.querySelector('.gjs-clm-tags');
    if (!tagsElement) return;
    let toggleElement = tagsElement.querySelector('[data-db-style-scope]');
    if (!toggleElement) {
      toggleElement = buildElementFromMarkup(containerElement.ownerDocument, buildStyleScopeToggleMarkup());
      if (!toggleElement) return;
      tagsElement.insertBefore(toggleElement, tagsElement.firstChild);
      toggleElement.addEventListener('click', (clickEvent) => {
        const buttonElement =
          clickEvent.target && clickEvent.target.closest
            ? clickEvent.target.closest('[data-db-style-scope-mode]')
            : null;
        if (!buttonElement || buttonElement.disabled) return;
        switchStyleScope(editor, buttonElement.getAttribute('data-db-style-scope-mode'));
        refreshStyleScopeToggle(editor, toggleElement);
      });
    }
    refreshStyleScopeToggle(editor, toggleElement);
  };
  editor.on('run:core:open-styles run:open-sm component:toggled selector:type', () => setTimeout(renderToggle, 0));
};

export default mountStyleScopeToggle;
