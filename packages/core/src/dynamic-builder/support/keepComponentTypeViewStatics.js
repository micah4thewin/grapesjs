import restoreComponentTypeViewStatics from './restoreComponentTypeViewStatics.js';

const keepComponentTypeViewStatics = (editor) => {
  if (!editor || !editor.on) return;
  editor.on('component:type:add component:type:update', () => restoreComponentTypeViewStatics(editor));
  restoreComponentTypeViewStatics(editor);
};

export default keepComponentTypeViewStatics;
