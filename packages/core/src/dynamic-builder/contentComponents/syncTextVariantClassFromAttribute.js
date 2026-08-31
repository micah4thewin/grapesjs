const syncTextVariantClassFromAttribute = (component) => {
  if (!component || !component.get || component.get('type') !== 'db-text') return;
  const variantValue = component.getAttributes()['data-db-variant'];
  const variantClassNames = ['db-text-lead', 'db-text-small', 'db-text-caption'];
  const nextClassName = variantClassNames.find((className) => className === `db-text-${variantValue}`);
  const currentClassNames = component.getClasses();
  variantClassNames
    .filter((className) => className !== nextClassName && currentClassNames.indexOf(className) >= 0)
    .forEach((className) => component.removeClass(className));
  if (nextClassName && currentClassNames.indexOf(nextClassName) < 0) component.addClass(nextClassName);
};

export default syncTextVariantClassFromAttribute;
