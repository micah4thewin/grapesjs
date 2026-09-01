const computeCrc32Checksum = (byteArray) => {
  const crcTable = [];
  for (let tableIndex = 0; tableIndex < 256; tableIndex++) {
    let tableValue = tableIndex;
    for (let bitIndex = 0; bitIndex < 8; bitIndex++) {
      tableValue = tableValue & 1 ? 0xedb88320 ^ (tableValue >>> 1) : tableValue >>> 1;
    }
    crcTable[tableIndex] = tableValue >>> 0;
  }
  let checksumValue = 0xffffffff;
  for (let byteIndex = 0; byteIndex < byteArray.length; byteIndex++) {
    checksumValue = crcTable[(checksumValue ^ byteArray[byteIndex]) & 0xff] ^ (checksumValue >>> 8);
  }
  return (checksumValue ^ 0xffffffff) >>> 0;
};

export default computeCrc32Checksum;
