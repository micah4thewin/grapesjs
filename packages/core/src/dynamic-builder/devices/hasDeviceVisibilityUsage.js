import getDeviceVisibilityRecords from './getDeviceVisibilityRecords.js';
import walkComponentTree from '../support/walkComponentTree.js';

const hasDeviceVisibilityUsage = (editor) => {
  const visibilityClasses = getDeviceVisibilityRecords().map((visibilityRecord) => visibilityRecord.className);
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const rootComponents = pageList.length
    ? pageList.map((pageModel) => (pageModel.getMainComponent ? pageModel.getMainComponent() : null))
    : [editor.getWrapper && editor.getWrapper()];
  let usageFound = false;
  rootComponents.forEach((rootComponent) => {
    if (usageFound || !rootComponent) return;
    walkComponentTree(rootComponent, (componentModel) => {
      if (usageFound || !componentModel.getClasses) return;
      const classNames = componentModel.getClasses();
      usageFound = visibilityClasses.some((className) => classNames.indexOf(className) >= 0);
    });
  });
  return usageFound;
};

export default hasDeviceVisibilityUsage;
