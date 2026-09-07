import findComponentsByClassName from './findComponentsByClassName.js';
import readComponentTextContent from './readComponentTextContent.js';

const hasDefaultNavbarLinks = (navbarComponent, interactiveTextDefaults) => {
  const linkComponents = findComponentsByClassName(navbarComponent, 'db-navbar-link');
  const labelTexts = linkComponents.map((linkComponent) => readComponentTextContent(linkComponent));
  if (labelTexts.join('|') !== interactiveTextDefaults.navbarLinkLabels.join('|')) return false;
  return linkComponents.every((linkComponent) => {
    const hrefValue = String((linkComponent.getAttributes() || {}).href || '');
    return hrefValue === '' || hrefValue === 'index.html' || hrefValue.charAt(0) === '#';
  });
};

export default hasDefaultNavbarLinks;
