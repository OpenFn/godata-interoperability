// Your job goes here.
alterState(state => {

    return upsertMany('tbl_cases', 'ON CONSTRAINT tbl_cases_pkey', state =>
      state.cases.map(element => {
        return {
          // Here goes the mapping
          // attribute: element.attribute
        };
      })
    )(state);
  });
  
  