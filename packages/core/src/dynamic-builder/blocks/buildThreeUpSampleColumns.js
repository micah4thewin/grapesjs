import buildColumnsContentRecord from './buildColumnsContentRecord.js';

const buildThreeUpSampleColumns = (buildSampleRecord, recordName) =>
  buildColumnsContentRecord(
    'three',
    [0, 1, 2].map((sampleIndex) => [buildSampleRecord(sampleIndex)]),
    recordName,
  );

export default buildThreeUpSampleColumns;
