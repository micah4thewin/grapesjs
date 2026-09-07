import getToolsMenuSections from './getToolsMenuSections.js';
import hasShellCommand from './hasShellCommand.js';

const listAvailableToolsMenuSections = (editor) =>
  getToolsMenuSections()
    .map((sectionRecord) => ({
      sectionTitle: sectionRecord.sectionTitle,
      commandIds: sectionRecord.commandIds.filter((commandId) => hasShellCommand(editor, commandId)),
    }))
    .filter((sectionRecord) => sectionRecord.commandIds.length > 0);

export default listAvailableToolsMenuSections;
