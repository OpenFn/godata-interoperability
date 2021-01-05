alterState(state => {
  if (state.summary !== undefined) {
    const { dateOfReporting, value } = state.summary;

    const dataValue = {
      completeDate: `${dateOfReporting.substring(
        0,
        4
      )}-${dateOfReporting.substring(5, 7)}-${dateOfReporting.substring(
        8,
        10
      )}`,
      dataSet: 'kIfMNugiTgd',
      period: `${dateOfReporting.substring(0, 4)}${dateOfReporting.substring(
        5,
        7
      )}${dateOfReporting.substring(8, 10)}`,
      orgUnit: 'CnPsS2xE8UN',
      dataValues: [
        {
          dataElement: 'CnPsS2xE8UN',
          value,
        },
      ],
    };

    console.log('Importing data on DHIS2...');
    console.log(dataValue);

    return dataValueSet(dataValue)(state);
  } else {
    console.log('No cases were imported to DHIS2...');
    return state;
  }
});
