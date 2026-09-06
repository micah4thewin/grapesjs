import buildDosDateTimeParts from './buildDosDateTimeParts.js';
import computeCrc32Checksum from './computeCrc32Checksum.js';

const localHeaderSize = 30;
const centralHeaderSize = 46;
const endRecordSize = 22;

const buildZipArchiveBytes = (fileRecords, archiveDate) => {
  const textEncoder = new TextEncoder();
  const { dosDate, dosTime } = buildDosDateTimeParts(archiveDate);
  const entryRecords = (Array.isArray(fileRecords) ? fileRecords : []).map((fileRecord) => {
    const nameBytes = textEncoder.encode(String(fileRecord.fileName || ''));
    const dataBytes = textEncoder.encode(String(fileRecord.content == null ? '' : fileRecord.content));
    return { nameBytes, dataBytes, checksumValue: computeCrc32Checksum(dataBytes) };
  });
  const localSectionSize = entryRecords.reduce(
    (totalSize, entryRecord) =>
      totalSize + localHeaderSize + entryRecord.nameBytes.length + entryRecord.dataBytes.length,
    0,
  );
  const centralSectionSize = entryRecords.reduce(
    (totalSize, entryRecord) => totalSize + centralHeaderSize + entryRecord.nameBytes.length,
    0,
  );
  const archiveBytes = new Uint8Array(localSectionSize + centralSectionSize + endRecordSize);
  const archiveView = new DataView(archiveBytes.buffer);
  let writeOffset = 0;
  const writeUint16 = (numberValue) => {
    archiveView.setUint16(writeOffset, numberValue & 0xffff, true);
    writeOffset += 2;
  };
  const writeUint32 = (numberValue) => {
    archiveView.setUint32(writeOffset, numberValue >>> 0, true);
    writeOffset += 4;
  };
  const writeBytes = (byteArray) => {
    archiveBytes.set(byteArray, writeOffset);
    writeOffset += byteArray.length;
  };
  entryRecords.forEach((entryRecord) => {
    entryRecord.localOffset = writeOffset;
    writeUint32(0x04034b50);
    writeUint16(20);
    writeUint16(0x0800);
    writeUint16(0);
    writeUint16(dosTime);
    writeUint16(dosDate);
    writeUint32(entryRecord.checksumValue);
    writeUint32(entryRecord.dataBytes.length);
    writeUint32(entryRecord.dataBytes.length);
    writeUint16(entryRecord.nameBytes.length);
    writeUint16(0);
    writeBytes(entryRecord.nameBytes);
    writeBytes(entryRecord.dataBytes);
  });
  const centralStartOffset = writeOffset;
  entryRecords.forEach((entryRecord) => {
    writeUint32(0x02014b50);
    writeUint16(20);
    writeUint16(20);
    writeUint16(0x0800);
    writeUint16(0);
    writeUint16(dosTime);
    writeUint16(dosDate);
    writeUint32(entryRecord.checksumValue);
    writeUint32(entryRecord.dataBytes.length);
    writeUint32(entryRecord.dataBytes.length);
    writeUint16(entryRecord.nameBytes.length);
    writeUint16(0);
    writeUint16(0);
    writeUint16(0);
    writeUint16(0);
    writeUint32(0);
    writeUint32(entryRecord.localOffset);
    writeBytes(entryRecord.nameBytes);
  });
  const centralSectionBytes = writeOffset - centralStartOffset;
  const entryCountField = Math.min(entryRecords.length, 0xffff);
  writeUint32(0x06054b50);
  writeUint16(0);
  writeUint16(0);
  writeUint16(entryCountField);
  writeUint16(entryCountField);
  writeUint32(centralSectionBytes);
  writeUint32(centralStartOffset);
  writeUint16(0);
  return archiveBytes;
};

export default buildZipArchiveBytes;
