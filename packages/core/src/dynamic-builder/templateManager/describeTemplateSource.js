import getPageDisplayName from '../shell/getPageDisplayName.js';

const describeTemplateSource = (editor, kindName, sourceComponents) => {
  if (kindName === 'page') {
    const selectedPage = editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected();
    const pageName = selectedPage ? getPageDisplayName(selectedPage) : 'this page';
    return {
      summaryText: 'the whole of "' + pageName + '" (' + sourceComponents.length + ' sections)',
      defaultName: pageName + ' layout',
    };
  }
  const sourceComponent = sourceComponents[0];
  const componentName = sourceComponent && sourceComponent.get ? String(sourceComponent.get('name') || '') : '';
  return {
    summaryText: 'the selected ' + (componentName ? componentName.toLowerCase() : 'section'),
    defaultName: (componentName || 'Section') + ' block',
  };
};

export default describeTemplateSource;
