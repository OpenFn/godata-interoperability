//Job to fetch Cases to sync to other system

// Fetch cases from Go.Data matching a specific outbreak id
listCases('3b5554d7-2c19-41d0-b9af-475ad25a382b', {}, state => {
  state.cases = state.data.map(element => {
    return {
      name: `${element.firstName}, ${element.lastName || ''}`,
      status: element.classification,
      externalId: element.id,
      caseId: element.visualId,
      age: element.age ? element.age.years : element['age:years'],
      phone:
        element.addresses && element.addresses[0]
          ? element.addresses[0].phoneNumber
          : element['addresses:phoneNumber'],
      country:
        element.addresses && element.addresses[0]
          ? element.addresses[0].country
          : element['addresses:country'],
      location:
        element.addresses && element.addresses[0]
          ? element.addresses[0].locationId
          : element['addresses:locationId'],
    };
  });
  return state;
});

// Bulk post to OpenFn Inbox
alterState(state => {
  const { openfnInboxUrl } = state.configuration;
  const data = state.cases;
  console.log(`Sending to OpenFn Inbox in bulk...`);
  return axios({
    method: 'POST',
    url: `${openfnInboxUrl}`,
    data,
  }).then(response => {
    console.log(response);
    return state;
  });
});
