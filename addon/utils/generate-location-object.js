export default function generateLocationObject(googleLocation) {
  if (!('address_components' in googleLocation)) {
    return {};
  }

  const addressComponents = googleLocation.address_components.reduce((acc, component) => {
      let componentType = component.types[0];

      switch(componentType) {
        case 'route':
          acc[componentType] = component.short_name;
          break;
        case 'locality':
          acc[componentType] = component.long_name;
          break;
        case 'administrative_area_level_1':
          acc['administrative_area_level_1_short'] = component.short_name;
          acc['administrative_area_level_1_long'] = component.long_name;
          break;
        case 'administrative_area_level_2':
          acc['administrative_area_level_2_short'] = component.short_name;
          acc['administrative_area_level_2_long'] = component.long_name;
          break;
        case 'country':
          acc[componentType] = component.short_name;
          break;
        case 'postal_code':
          acc[componentType] = component.short_name;
          break;
        default:
          acc[componentType] = component.short_name;
      }

    return acc;
  }, {});

  let street;
  if (addressComponents.route) {
    street = addressComponents.route;

    if (addressComponents.street_number) {
      street += ` ${addressComponents.street_number}`;
    }
  }

  // let locationType = 'city';
  // if (!locationObject.city){
  //   if (!locationObject.admin_level1) {
  //     if (!locationObject.admin_level2) {
  //       locationType = 'country';
  //     } else{
  //       locationType = 'admin_level2';
  //     }
  //   } else {
  //     locationType = 'admin_level1';
  //   }
  // }

  const locationObject = {
    admin1_s: addressComponents.administrative_area_level_1_short,
    admin2_s: addressComponents.administrative_area_level_2_short,
    admin1_l: addressComponents.administrative_area_level_1_long,
    admin2_l: addressComponents.administrative_area_level_2_long,
    country: addressComponents.country,
    country_code: addressComponents.country,
    city: addressComponents.locality,
    zip: addressComponents.postal_code,
    street: street,
    place_id: googleLocation.place_id,
    formatted_address: googleLocation.formatted_address,
    // type: locationType,
  };

  return cleanObject(locationObject);
}

function cleanObject(obj) {
  const dup = Object.assign({}, obj);
  const propNames = Object.getOwnPropertyNames(dup);

  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i];
    if (dup[propName] === null || dup[propName] === undefined) {
      delete dup[propName];
    }
  }

  return dup;
}
