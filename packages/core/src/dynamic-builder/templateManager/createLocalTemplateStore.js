import normalizeUserTemplateRecord from './normalizeUserTemplateRecord.js';
import readUserTemplateRecords from './readUserTemplateRecords.js';
import writeUserTemplateRecords from './writeUserTemplateRecords.js';

const storageFullMessage = 'There was no room left in this browser to save the template.';

const createLocalTemplateStore = () => ({
  listTemplates: () => Promise.resolve(readUserTemplateRecords()),
  writeTemplate: (templateRecord) => {
    const normalizedRecord = normalizeUserTemplateRecord(templateRecord);
    if (!normalizedRecord) return Promise.reject(new Error('A template needs a name and at least one section.'));
    const keptRecords = readUserTemplateRecords().filter(
      (storedRecord) => storedRecord.templateId !== normalizedRecord.templateId,
    );
    return writeUserTemplateRecords([normalizedRecord, ...keptRecords])
      ? Promise.resolve(normalizedRecord)
      : Promise.reject(new Error(storageFullMessage));
  },
  deleteTemplate: (templateId) => {
    const keptRecords = readUserTemplateRecords().filter(
      (storedRecord) => storedRecord.templateId !== String(templateId),
    );
    return writeUserTemplateRecords(keptRecords)
      ? Promise.resolve(true)
      : Promise.reject(new Error('The template could not be removed from this browser.'));
  },
});

export default createLocalTemplateStore;
