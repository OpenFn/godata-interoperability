//Job to upload Health Sites to Go.Data as reference data
alterState(state => {
  let locations = [];
  Object.keys(state.data).forEach(key => {
    if (state.data[key].attributes) {
      const { amenity } = state.data[key].attributes;
      if (amenity === 'hospital') locations.push(state.data[key]);
    }
  });

  const valid_locations = locations.filter(
    location => location.attributes.name !== undefined
  );
  return { ...state, locations: valid_locations };
});

each(
  '$.locations[*]',
  alterState(state => {
    const { attributes, centroid } = state.data;
    const coordinates = centroid.coordinates;
    const data = {
      name: attributes.name,
      // synonyms: [attributes.amenity],
      identifiers: [{ description: 'uuid', code: attributes.uuid }],
      geoLocation: { lat: coordinates[1], lng: coordinates[0] },
      active: true,
      parentLocationId: 'e86414e4-d91c-4ab8-be2a-720ae90b5106',
      geographicalLevelId:
        'LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_HOSPITAL_FACILITY',
    };

    return upsertLocation('name', {
      data,
    })(state);
  })
);
