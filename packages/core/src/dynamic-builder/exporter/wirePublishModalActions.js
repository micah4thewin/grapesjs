import buildExportBundleRecords from './buildExportBundleRecords.js';
import openModalCommandAndReturn from './openModalCommandAndReturn.js';
import isEditorUsable from './isEditorUsable.js';
import runWithBusyButton from './runWithBusyButton.js';

const wirePublishModalActions = (editor, rootElement, context) => {
  const { buildOptions, preflightRecord, moduleOptions, reopenModal } = context;
  const publishHook = moduleOptions && typeof moduleOptions.onPublish === 'function' ? moduleOptions.onPublish : null;
  const continueButton = rootElement.querySelector('[data-db-publish-continue]');
  if (continueButton) {
    continueButton.addEventListener('click', () =>
      runWithBusyButton(continueButton, () => {
        if (!isEditorUsable(editor)) return;
        if (publishHook) {
          const bundleRecords = buildExportBundleRecords(editor, buildOptions);
          const hookResult = publishHook(editor, bundleRecords, { buildOptions, preflight: preflightRecord });
          if (hookResult !== false) {
            editor.Modal.close();
            return;
          }
        }
        editor.runCommand('db:download-site', { buildOptions, skipPreflight: true, preflight: preflightRecord });
        editor.Modal.close();
      }),
    );
  }
  const reportButton = rootElement.querySelector('[data-db-publish-report]');
  if (reportButton) {
    reportButton.addEventListener('click', () => {
      let auditsChanged = false;
      const markAuditsChanged = () => {
        auditsChanged = true;
      };
      editor.on('db:audit:complete', markAuditsChanged);
      const reopened = openModalCommandAndReturn(editor, 'db:open-audit-report', () => {
        editor.off('db:audit:complete', markAuditsChanged);
        reopenModal({ preflight: auditsChanged ? null : preflightRecord });
      });
      if (!reopened) editor.off('db:audit:complete', markAuditsChanged);
    });
  }
};

export default wirePublishModalActions;
