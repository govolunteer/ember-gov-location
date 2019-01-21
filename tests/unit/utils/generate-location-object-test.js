import generateLocationObject from 'dummy/utils/generate-location-object';
import { module, test } from 'qunit';

module('Unit | Utility | generate-location-object', function() {
  const hamburgGoogleLocation = {
    'address_components': [
      {
        'long_name': 'Hamburg',
        'short_name': 'Hamburg',
        'types': [
          'locality',
          'political'
        ]
      },
      {
        'long_name': 'Hamburg',
        'short_name': 'HH',
        'types': [
          'administrative_area_level_1',
          'political'
        ]
      },
      {
        'long_name': 'Germany',
        'short_name': 'DE',
        'types': [
          'country',
          'political'
        ]
      }
    ],
    'formatted_address': 'Hamburg, Germany',
    'geometry': {
      'location': {},
      'viewport': {
        'ma': {
          'j': 53.399999,
          'l': 53.717145
        },
        'ga': {
          'j': 9.73215099999993,
          'l': 10.123491999999942
        }
      }
    },
    'place_id': 'ChIJuRMYfoNhsUcRoDrWe_I9JgQ',
    'types': [
      'locality',
      'political'
    ],
  };

  test('converts Google results into our own location object', function(assert) {
    const actual = generateLocationObject(hamburgGoogleLocation);
    const expected = {
      admin1_l: 'Hamburg',
      admin1_s: 'HH',
      city: 'Hamburg',
      country: 'DE',
      country_code: 'DE',
      formatted_address: 'Hamburg, Germany',
      place_id: 'ChIJuRMYfoNhsUcRoDrWe_I9JgQ',
    };
    assert.deepEqual(actual, expected);
  });
});
