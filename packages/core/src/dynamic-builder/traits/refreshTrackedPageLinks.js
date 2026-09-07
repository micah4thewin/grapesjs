import resolveLinkHref from './resolveLinkHref.js';
import walkComponentTree from '../support/walkComponentTree.js';

const refreshTrackedPageLinks = (editor) => {
  const pagesModule = editor && editor.Pages;
  const sitePages = pagesModule && pagesModule.getAll ? pagesModule.getAll() : [];
  let updatedCount = 0;
  sitePages.forEach((sitePage) => {
    const rootComponent = sitePage && sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    walkComponentTree(rootComponent, (visitedComponent) => {
      if (!visitedComponent || !visitedComponent.get) return;
      const rawAttributes = visitedComponent.get('attributes') || {};
      const pageId = rawAttributes['data-db-link-page'];
      if (!pageId) return;
      const nextHref = resolveLinkHref(editor, {
        kind: 'page',
        pageId: String(pageId),
        anchorId: String(rawAttributes['data-db-link-anchor'] || ''),
      });
      if (nextHref === String(rawAttributes.href || '')) return;
      visitedComponent.addAttributes({ href: nextHref }, { avoidStore: true });
      updatedCount += 1;
    });
  });
  return updatedCount;
};

export default refreshTrackedPageLinks;
