import buildNavbarLinkItemMarkup from './buildNavbarLinkItemMarkup.js';

const addNavbarMenuItem = (navbarComponent) => {
  if (!navbarComponent || !navbarComponent.find) return;
  const menuComponent = navbarComponent.find('[data-db-navbar-menu]')[0];
  if (!menuComponent) return;
  menuComponent.append(buildNavbarLinkItemMarkup('New link', '#'));
};

export default addNavbarMenuItem;
