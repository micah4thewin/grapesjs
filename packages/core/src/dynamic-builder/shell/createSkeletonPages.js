import getNewPageStarterComponents from './getNewPageStarterComponents.js';
import resolveUniquePageName from './resolveUniquePageName.js';

const createSkeletonPages = (editor, pagePresets) =>
  pagePresets
    .map((presetRecord) => {
      const pageName = resolveUniquePageName(editor, presetRecord.pageName);
      const starterComponents = getNewPageStarterComponents(pageName);
      if (presetRecord.sectionType && editor.DomComponents.getType(presetRecord.sectionType)) {
        starterComponents.push({ type: presetRecord.sectionType });
      }
      return editor.Pages.add({ name: pageName, component: starterComponents }, { select: false });
    })
    .filter(Boolean);

export default createSkeletonPages;
