const readDriverFactory = (targetWindow) => {
  const driverNamespace = targetWindow && targetWindow.driver;
  const moduleRecord = driverNamespace && driverNamespace.js;
  const factoryValue = moduleRecord && moduleRecord.driver;
  return typeof factoryValue === 'function' ? factoryValue : null;
};

export default readDriverFactory;
