import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import buildDesignKitCardMarkup from './buildDesignKitCardMarkup.js';
import resolveKitPreviewTokens from './resolveKitPreviewTokens.js';

const renderDesignKitGrids = (kitsElement, kitState, activeKitId, moduleOptions) => {
  const baselineRecord = buildBaselineTokenRecord(moduleOptions);
  const renderGrid = (gridKey, kitRecords) => {
    const gridElement = kitsElement.querySelector(`[data-db-kit-grid="${gridKey}"]`);
    if (!gridElement) return;
    gridElement.innerHTML = kitRecords
      .map((kitRecord) =>
        buildDesignKitCardMarkup(
          kitRecord,
          activeKitId,
          resolveKitPreviewTokens(baselineRecord, moduleOptions, kitRecord),
        ),
      )
      .join('');
  };
  renderGrid('builtIn', kitState.builtIn);
  renderGrid('custom', kitState.custom);
  const emptyElement = kitsElement.querySelector('[data-db-kit-empty]');
  if (emptyElement) emptyElement.hidden = kitState.custom.length > 0;
};

export default renderDesignKitGrids;
