import buildNavbarLinksFromPages from './buildNavbarLinksFromPages.js';
import showToastNotice from '../support/showToastNotice.js';

const runNavbarBuildMenuCommand = (editor) => {
  let navbarComponent = editor.getSelected ? editor.getSelected() : null;
  while (navbarComponent && String(navbarComponent.get('type') || '') !== 'db-navbar') {
    navbarComponent = typeof navbarComponent.parent === 'function' ? navbarComponent.parent() : null;
  }
  if (!navbarComponent) {
    showToastNotice(editor, 'Select a navbar first.', { kind: 'warning' });
    return 0;
  }
  const linkCount = buildNavbarLinksFromPages(editor, navbarComponent);
  const noticeText = linkCount === 1 ? 'Menu rebuilt with 1 page link' : 'Menu rebuilt with ' + linkCount + ' page links';
  showToastNotice(editor, noticeText, { kind: 'success' });
  return linkCount;
};

export default runNavbarBuildMenuCommand;
