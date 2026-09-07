import readCustomIconRecords from './readCustomIconRecords.js';

const listCustomIconNames = () => readCustomIconRecords().map((iconRecord) => iconRecord.iconName);

export default listCustomIconNames;
