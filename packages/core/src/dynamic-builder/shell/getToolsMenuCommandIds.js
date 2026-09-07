import getToolsMenuSections from './getToolsMenuSections.js';

const getToolsMenuCommandIds = () =>
  getToolsMenuSections().reduce(
    (commandIds, sectionRecord) => commandIds.concat(sectionRecord.commandIds),
    ['db:open-command-palette'],
  );

export default getToolsMenuCommandIds;
