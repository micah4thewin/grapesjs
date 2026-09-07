import getToolsMenuSections from './getToolsMenuSections.js';

const resolvePaletteGroupTitle = (commandId) => {
  const menuSection = getToolsMenuSections().find((sectionRecord) => sectionRecord.commandIds.indexOf(commandId) >= 0);
  if (menuSection) return menuSection.sectionTitle;
  const extraGroups = {
    'db:save-revision': 'Publish',
    'db:download-site': 'Publish',
    'db:run-accessibility-audit': 'Publish',
    'db:run-performance-audit': 'Publish',
    'db:run-seo-audit': 'Publish',
    'db:run-all-audits': 'Publish',
    'db:run-preflight': 'Publish',
    'db:seo-health': 'Site',
    'db:create-symbol': 'Content',
    'db:edit-symbol': 'Content',
    'db:detach-symbol': 'Content',
    'db:browse-animations': 'Content',
    'core:open-layers': 'View',
    'core:open-styles': 'View',
    'core:open-traits': 'View',
    'core:open-blocks': 'View',
    'core:open-assets': 'View',
    'core:preview': 'View',
    'core:fullscreen': 'View',
    'core:component-outline': 'View',
  };
  if (extraGroups[commandId]) return extraGroups[commandId];
  if (/page/.test(commandId)) return 'Pages';
  if (commandId.indexOf('core:') === 0) return 'Editing';
  return 'Tools';
};

export default resolvePaletteGroupTitle;
