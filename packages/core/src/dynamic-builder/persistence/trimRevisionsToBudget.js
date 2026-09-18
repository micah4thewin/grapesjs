const measureRecordBytes = (revisionRecord) => {
  try {
    // Browsers store these strings as UTF-16, so a character costs two bytes.
    return JSON.stringify(revisionRecord).length * 2;
  } catch (serializeError) {
    return 0;
  }
};

// Revisions used to be dropped only once the browser had already refused a
// write, which left every other key facing a full quota. The list now keeps
// itself inside a byte budget up front, newest first.
const trimRevisionsToBudget = (revisionList, maxRevisionBytes) => {
  if (!Number.isFinite(maxRevisionBytes) || maxRevisionBytes <= 0) {
    return { keptList: revisionList, droppedList: [] };
  }
  const keptList = [];
  const droppedList = [];
  let usedBytes = 0;
  revisionList.forEach((revisionRecord, recordIndex) => {
    const recordBytes = measureRecordBytes(revisionRecord);
    // The newest entry is the save that was just asked for, so it always stays.
    if (recordIndex > 0 && usedBytes + recordBytes > maxRevisionBytes) {
      droppedList.push(revisionRecord);
      return;
    }
    usedBytes += recordBytes;
    keptList.push(revisionRecord);
  });
  return { keptList, droppedList };
};

export default trimRevisionsToBudget;
