import buildSourceOptionRecords from './buildSourceOptionRecords.js';
import listDataSourceNames from './listDataSourceNames.js';
import listRepeatersAcrossPages from './listRepeatersAcrossPages.js';

const refreshRepeaterSourceOptions = (editor) => {
  const sourceNames = listDataSourceNames(editor);
  listRepeatersAcrossPages(editor).forEach(({ component }) => {
    const sourceTrait = component.getTrait ? component.getTrait('data-db-source') : null;
    if (!sourceTrait) return;
    const currentValue = component.getAttributes()['data-db-source'];
    sourceTrait.set('options', buildSourceOptionRecords(sourceNames, currentValue));
  });
};

export default refreshRepeaterSourceOptions;
