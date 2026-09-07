import listPageLinkComponents from './listPageLinkComponents.js';

const rewritePageLinkHrefs = (editor, previousBaseName, nextBaseName) => {
  if (!previousBaseName || !nextBaseName || previousBaseName === nextBaseName) return 0;
  const linkComponents = listPageLinkComponents(editor, previousBaseName, null);
  linkComponents.forEach((linkComponent) => {
    const currentHref = String(linkComponent.getAttributes().href || '');
    const nextHref = currentHref.replace(`${previousBaseName}.html`, `${nextBaseName}.html`);
    if (nextHref !== currentHref) linkComponent.addAttributes({ href: nextHref });
  });
  return linkComponents.length;
};

export default rewritePageLinkHrefs;
