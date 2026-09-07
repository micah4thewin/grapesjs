import handleNewSiteSubmit from './handleNewSiteSubmit.js';
import handleSiteManagerClick from './handleSiteManagerClick.js';
import refreshSiteManagerList from './refreshSiteManagerList.js';

const wireSiteManagerModal = (editor, managerOptions, rootElement) => {
  const refreshList = () => refreshSiteManagerList(editor, managerOptions, rootElement);
  rootElement.addEventListener('click', (clickEvent) =>
    handleSiteManagerClick(editor, managerOptions, clickEvent, refreshList),
  );
  rootElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    handleNewSiteSubmit(editor, rootElement);
  });
  return refreshList;
};

export default wireSiteManagerModal;
