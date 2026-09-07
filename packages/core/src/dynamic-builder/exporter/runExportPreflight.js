import buildPreflightFromSummaries from './buildPreflightFromSummaries.js';
import collectExportNotes from './collectExportNotes.js';
import normalizePreflightResult from './normalizePreflightResult.js';
import runPublishAuditSummaries from './runPublishAuditSummaries.js';

const runExportPreflight = (editor) => {
  const exportNotes = collectExportNotes(editor);
  const commandsModule = editor.Commands;
  const hasPreflightCommand =
    !!commandsModule && typeof commandsModule.has === 'function' && commandsModule.has('db:run-preflight');
  if (hasPreflightCommand) {
    try {
      const normalizedResult = normalizePreflightResult(
        editor.runCommand('db:run-preflight', { silent: true, source: 'export' }),
      );
      if (normalizedResult) return { ...normalizedResult, notes: normalizedResult.notes.concat(exportNotes) };
    } catch (preflightError) {
      console.error('dynamic-builder preflight command failed', preflightError);
    }
  }
  return buildPreflightFromSummaries(runPublishAuditSummaries(editor), exportNotes, 'audits');
};

export default runExportPreflight;
