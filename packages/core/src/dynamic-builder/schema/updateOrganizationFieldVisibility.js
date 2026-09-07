import resolveOrganizationTypeKind from './resolveOrganizationTypeKind.js';

const updateOrganizationFieldVisibility = (rootElement, organizationType) => {
  const typeKind = resolveOrganizationTypeKind(organizationType);
  rootElement.querySelectorAll('[data-db-schema-when]').forEach((groupElement) => {
    const allowedKinds = String(groupElement.getAttribute('data-db-schema-when') || '').split(/\s+/);
    groupElement.hidden = !allowedKinds.includes(typeKind);
  });
};

export default updateOrganizationFieldVisibility;
