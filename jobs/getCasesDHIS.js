//Job to fetch Cases to sync to other system

// Fetch cases from Go.Data matching a specific outbreak id
getCase(
  '3b5554d7-2c19-41d0-b9af-475ad25a382b',
  {
    where: {
      classification:
        'LNG_REFERENCE_DATA_CATEGORY_CASE_CLASSIFICATION_CONFIRMED',
    },
  },
  {},
  state => {
    console.log(`Previous cursor: ${state.lastDateOfReporting}`);

    const manualCursor = '2020-12-01T14:32:43.325+01:00';

    function is24(date) {
      // check if a given date fits in last 24 hours
      const date1 = new Date(date);
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const timeStampYesterday = timeStamp - 24 * 3600;
      return date1 >= new Date(timeStampYesterday * 1000).getTime();
    }

    const currentCases = state.data.filter(report => {
      return (
        report.dateOfReporting > (state.lastDateOfReporting || manualCursor)
      );
    });

    const lastDateOfReporting = state.data
      .filter(item => item.dateOfReporting)
      .map(s => s.dateOfReporting)
      .sort((a, b) => new Date(b) - new Date(a))[0];

    console.log('last day', lastDateOfReporting);

    return { ...state, currentCases, lastDateOfReporting };
  }
);
