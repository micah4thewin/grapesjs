const formatIsoDateTimeText = (dateValue) => dateValue.toISOString().replace('T', ' ').slice(0, 19);

export default formatIsoDateTimeText;
