import parseImportedRevisionPayload from './parseImportedRevisionPayload.js';
import readFileAsText from './readFileAsText.js';
import saveRevisionRecord from './saveRevisionRecord.js';

const importRevisionFile = (editor, moduleOptions, fileValue) =>
  readFileAsText(fileValue)
    .then((jsonText) => {
      const importedPayload = parseImportedRevisionPayload(jsonText);
      if (!importedPayload) {
        editor.trigger('db:revision:error', {
          message: 'This file is not a site backup. Choose a project.json or a downloaded revision.',
        });
        return null;
      }
      const fileName = String((fileValue && fileValue.name) || 'backup.json');
      return saveRevisionRecord(editor, moduleOptions, 'Imported ' + fileName, {
        kind: 'import',
        payload: { projectData: importedPayload.projectData, siteMeta: importedPayload.siteMeta },
      });
    })
    .catch(() => {
      editor.trigger('db:revision:error', { message: 'The backup file could not be read.' });
      return null;
    });

export default importRevisionFile;
