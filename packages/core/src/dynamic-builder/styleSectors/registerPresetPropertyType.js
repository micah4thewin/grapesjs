import buildPresetPropertyElement from './buildPresetPropertyElement.js';
import syncPresetPropertyElement from './syncPresetPropertyElement.js';

const registerPresetPropertyType = (editor) => {
  const styleManager = editor && editor.StyleManager;
  if (!styleManager || typeof styleManager.addType !== 'function') return;
  if (styleManager.getType && styleManager.getType('db-preset')) return;
  styleManager.addType('db-preset', {
    create: ({ el, props, change }) => buildPresetPropertyElement(el ? el.ownerDocument : null, props, change),
    emit: ({ updateStyle }, changeData) => {
      const changeRecord = changeData || {};
      if (typeof changeRecord.value !== 'string') return;
      updateStyle(changeRecord.value, { partial: !!changeRecord.partial });
    },
    update: ({ value, el }) => syncPresetPropertyElement(el, value),
    destroy: () => {},
  });
};

export default registerPresetPropertyType;
