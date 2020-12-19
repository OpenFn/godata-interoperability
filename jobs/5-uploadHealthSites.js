//Job to upload Health Sites to Go.Data as reference data
alterState(state => {
  let amenities = [];
  Object.keys(state.data).forEach(key => {
    if (state.data[key].attributes) {
      const { amenity } = state.data[key].attributes;
      if (amenity === 'hospital') amenities.push(state.data[key]);
    }
  });

  return { ...state, amenities };
});

each(
  '$.amenities[*]',
  alterState(state => {
    const { attributes, centroid } = state.data;
    const coordinates = centroid.coordinates;
    const data = {
      name: attributes.name,
      synonyms: [attributes.amenity],
      identifiers: [{ description: 'uuid', code: attributes.uuid }],
      geoLocation: { lat: coordinates[0], lng: coordinates[1] },
      active: true,
      parentLocationId: 'e86414e4-d91c-4ab8-be2a-720ae90b5106',
      geographicalLevelId:
        'LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_HOSPITAL_FACILITY',
    };
    return upsertLocation({
      externalId: `${attributes.uuid}`,
      data,
    })(state);
  })
);
