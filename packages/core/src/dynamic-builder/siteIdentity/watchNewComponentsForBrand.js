import applyLogoToNavbarBrands from './applyLogoToNavbarBrands.js';
import getSiteIdentityRecord from './getSiteIdentityRecord.js';
import replaceBrandTextAcrossPages from './replaceBrandTextAcrossPages.js';

const watchNewComponentsForBrand = (editor) => {
  const brandedTypes = ['db-navbar', 'db-footer', 'db-hero', 'db-cover-photo', 'db-cover-video', 'db-contact'];
  editor.on('component:add', (addedComponent) => {
    const componentType = addedComponent && addedComponent.get ? String(addedComponent.get('type') || '') : '';
    if (brandedTypes.indexOf(componentType) < 0) return;
    const identityRecord = getSiteIdentityRecord(editor);
    if (!identityRecord.siteName) return;
    setTimeout(() => {
      replaceBrandTextAcrossPages(editor, 'Acme Studio', identityRecord.siteName);
      if (componentType === 'db-navbar') applyLogoToNavbarBrands(editor, identityRecord);
    }, 30);
  });
};

export default watchNewComponentsForBrand;
