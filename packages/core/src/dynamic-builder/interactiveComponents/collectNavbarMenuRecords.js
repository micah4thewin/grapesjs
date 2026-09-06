const collectNavbarMenuRecords = (navbarComponent) => {
  if (!navbarComponent || !navbarComponent.find) return [];
  const menuComponent = navbarComponent.find('[data-db-navbar-menu]')[0];
  if (!menuComponent) return [];
  return menuComponent
    .components()
    .models.map((itemComponent) => {
      const linkComponent = itemComponent.find('a')[0] || itemComponent;
      return {
        itemComponent,
        linkComponent,
        labelText: String(linkComponent.getInnerHTML ? linkComponent.getInnerHTML() : '').trim(),
        linkHref: String((linkComponent.getAttributes && linkComponent.getAttributes().href) || ''),
      };
    })
    .filter((menuRecord) => Boolean(menuRecord.linkComponent));
};

export default collectNavbarMenuRecords;
