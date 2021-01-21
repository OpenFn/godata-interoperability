// Filter locations
alterState(state => {
  let locations = [];
  Object.keys(state.data).forEach(key => {
    if (state.data[key].attributes) {
      const { amenity } = state.data[key].attributes;
      if (amenity === 'hospital') locations.push(state.data[key]);
    }
  });

  const removeThai = /^[A-Za-z\s\d-\.]+$/; // We ignore any Thai name

  const valid_locations = locations
    .filter(location => location.attributes.name !== undefined)
    .filter(location => removeThai.test(location.attributes.name));

  return { ...state, locations: valid_locations };
});

// Upsert each location to Go.Data
each(
  '$.locations[*]',
  alterState(state => {
    function removeExtraUnderscore(object) {
      for (var obj in object) {
        if (object[obj] && typeof object[obj] !== 'boolean') {
          object[obj] = object[obj].replace(/\_{2,}/g, '');
          if (object[obj][object[obj].length - 1] === '_')
            object[obj] = object[obj].substring(0, object[obj].length - 1);
        }
      }
    }
    const { attributes } = state.data;
    // let name = attributes.name.replace(/[^A-Za-z\s\d-\.]/g, ''); // Remove Thai characters
    let name = attributes.name.replace(/,/g, '');
    name = name.split(' ').join('_').toUpperCase();
    name = name.replace(/[-\.]/g, '_');

    const outbreakId = '3B5554D7-2C19-41D0-B9AF-475AD25A382B';

    const data = {
      id: `LNG_OUTBREAK_${outbreakId}_LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME_${name}`,
      categoryId: 'LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME',
      value: attributes.name,
      code: attributes.uuid,
      active: true,
      readOnly: false,
      outbreakId: '3b5554d7-2c19-41d0-b9af-475ad25a382b',
      description: 'hospital',
      name: attributes.name,
    };
    removeExtraUnderscore(data);

    console.log(`Upserting location for ${data.name}`);
    console.log(data);
    return upsertReferenceData('id', data)(state);
  })
);
