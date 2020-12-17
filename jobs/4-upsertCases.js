// Upsert cases from GoData based on Case Id

upsertCase(
  'd4eecdeb-252d-44ec-bf76-515e005e03bd', // the outbreak ID
  {
    externalId: 'visual_id',
    data: {
      firstName: dataValue('body.Patient_name').split(' ')[0],
      lastName: dataValue('body.Patient_name').split(' ')[1],
      classification: dataValue('body.Sample_Classification'),
      visual_id: dataValue('body.Case_ID'),
      'age:years': dataValue('body.Age_in_year'),
      'addresses:country': 'Bangladesh',
      'addresses:city': dataValue('patient_address/Upazilla'),
      gender: dataValue('body.Sex'),
    },
  }
);
