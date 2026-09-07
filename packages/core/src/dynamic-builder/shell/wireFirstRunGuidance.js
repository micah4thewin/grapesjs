import hasHostProvidedContent from '../persistence/hasHostProvidedContent.js';
import hasStoredProjectSnapshot from './hasStoredProjectSnapshot.js';
import readShellPreference from './readShellPreference.js';
import showActionToastNotice from '../support/showActionToastNotice.js';
import writeShellPreference from './writeShellPreference.js';

const wireFirstRunGuidance = (editor, pluginOptions) => {
  const shellOptions = (pluginOptions && pluginOptions.shell) || {};
  if (shellOptions.firstRunWizard === false) return;
  if (readShellPreference(editor, pluginOptions, 'site-wizard') !== '') return;
  if (hasHostProvidedContent(editor) || hasStoredProjectSnapshot(editor, pluginOptions)) return;
  let isDestroyed = false;
  editor.on('destroy', () => {
    isDestroyed = true;
  });
  setTimeout(() => {
    if (isDestroyed || !editor.Pages || editor.Pages.getAll().length > 1) return;
    writeShellPreference(editor, pluginOptions, 'site-wizard', 'seen');
    showActionToastNotice(editor, 'New site? Set up your pages, navigation and footer in one minute.', {
      actionLabel: 'Set up',
      duration: 15000,
      onAction: () => editor.runCommand('db:open-site-wizard'),
    });
  }, 1200);
};

export default wireFirstRunGuidance;
