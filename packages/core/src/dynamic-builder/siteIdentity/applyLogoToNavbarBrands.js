import escapeHtmlText from '../support/escapeHtmlText.js';
import walkComponentTree from '../support/walkComponentTree.js';

const applyLogoToNavbarBrands = (editor, identityRecord) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage) => {
    walkComponentTree(sitePage.getMainComponent ? sitePage.getMainComponent() : null, (currentComponent) => {
      if (!currentComponent.getClasses || currentComponent.getClasses().indexOf('db-navbar-brand') < 0) return;
      const safeName = escapeHtmlText(identityRecord.siteName || 'Home');
      const logoMarkup = identityRecord.logoSrc
        ? `<img class="db-navbar-logo" src="${escapeHtmlText(identityRecord.logoSrc)}" alt="${safeName} logo">`
        : '';
      currentComponent.components(`${logoMarkup}<span class="db-navbar-brand-text">${safeName}</span>`);
    });
  });
};

export default applyLogoToNavbarBrands;
