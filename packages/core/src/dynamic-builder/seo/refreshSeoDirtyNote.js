import isSeoModalDirty from './isSeoModalDirty.js';

const refreshSeoDirtyNote = (rootElement) => {
  const noteElement = rootElement.querySelector('[data-db-seo-dirty]');
  if (noteElement) noteElement.hidden = !isSeoModalDirty(rootElement);
};

export default refreshSeoDirtyNote;
