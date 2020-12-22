// Your job goes here.
alterState(state => {
  console.log('Upserting in HMIS database...');
  console.log(state.cases);

  return upsertMany('tbl_cases', 'ON CONSTRAINT tbl_cases_pkey', state =>
    state.cases.map(report => {
      return {
        // Here goes the mapping
        // attribute: element.attribute
      };
    })
  )(state);
});
