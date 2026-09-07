import listAvailableToolsMenuSections from './listAvailableToolsMenuSections.js';

const getToolsMenuCommandIds = (editor) =>
  listAvailableToolsMenuSections(editor).reduce(
    (commandIds, sectionRecord) => commandIds.concat(sectionRecord.commandIds),
    ['db:open-command-palette'],
  );

export default getToolsMenuCommandIds;
