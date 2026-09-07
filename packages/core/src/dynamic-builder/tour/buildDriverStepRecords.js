const buildDriverStepRecords = (stepRecords) =>
  stepRecords.map((stepRecord) => ({
    element: stepRecord.element,
    popover: {
      title: stepRecord.title,
      description: stepRecord.description,
      side: stepRecord.side,
      align: stepRecord.align,
    },
  }));

export default buildDriverStepRecords;
