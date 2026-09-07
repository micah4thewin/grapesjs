import listSymbolInstances from './listSymbolInstances.js';
import resolveSymbolInstanceName from './resolveSymbolInstanceName.js';
import runSilentSymbolRender from './runSilentSymbolRender.js';

const renameSymbolInstances = (editor, symbolRecord) => {
  if (!symbolRecord || !symbolRecord.id) return;
  const instanceName = resolveSymbolInstanceName(symbolRecord);
  runSilentSymbolRender(editor, () =>
    listSymbolInstances(editor, symbolRecord.id).forEach((instanceComponent) =>
      instanceComponent.set('name', instanceName, { avoidStore: true }),
    ),
  );
};

export default renameSymbolInstances;
