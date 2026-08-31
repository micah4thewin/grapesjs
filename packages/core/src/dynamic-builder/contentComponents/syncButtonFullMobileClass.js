const syncButtonFullMobileClass = (component) => {
  if (!component || !component.get || component.get('type') !== 'db-button') return;
  const fullMobileValue = component.getAttributes()['data-db-full-mobile'];
  const shouldHaveClass = fullMobileValue === 'true';
  const hasClass = component.getClasses().indexOf('db-button-full-mobile') >= 0;
  if (shouldHaveClass && !hasClass) component.addClass('db-button-full-mobile');
  if (!shouldHaveClass && hasClass) component.removeClass('db-button-full-mobile');
};

export default syncButtonFullMobileClass;
