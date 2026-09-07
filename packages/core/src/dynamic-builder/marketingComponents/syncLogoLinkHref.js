const syncLogoLinkHref = (linkComponent) => {
  if (!linkComponent || !linkComponent.getAttributes) return;
  const attributeRecord = linkComponent.getAttributes();
  if (attributeRecord['data-db-logo-link'] === undefined) return;
  if (attributeRecord.href === '') linkComponent.removeAttributes(['href']);
};

export default syncLogoLinkHref;
