import setTextLeafContent from './setTextLeafContent.js';

const appendSkeletonHero = (editor, homePage, siteName) => {
  const rootComponent = homePage.getMainComponent();
  if (!editor.DomComponents.getType('db-hero')) return null;
  if (rootComponent.find('[data-db-type="hero"]').length) return null;
  const heroComponent = rootComponent.append({ type: 'db-hero' }, { at: 0 })[0];
  if (!heroComponent) return null;
  const titleComponent = heroComponent.find('.db-hero-title')[0];
  titleComponent && setTextLeafContent(titleComponent, `Welcome to ${siteName}`);
  return heroComponent;
};

export default appendSkeletonHero;
