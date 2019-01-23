import Component from '@ember/component';
import layout from '../templates/components/places-autocomplete';
import { get, set } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['c-places-autocomplete'],
  value: '',

  currentPlace: null,

  init() {
    this._super(...arguments);

    const initialValue = get(this, 'initialValue');
    if (initialValue) {
      set(this, 'value', initialValue);
    }
  },

  // didReceiveAttrs() {
  //   this._super(...arguments);
  //
  //   const initialValue = get(this, 'initialValue');
  //   if (initialValue) {
  //     set(this, 'value', initialValue);
  //   }
  // },

  didInsertElement() {
    this._super(...arguments);

    const componentRestrictions = get(this, 'restrictions');

    const options = {
      types: ['geocode'],
      componentRestrictions,
    };

    const input = this.element.children.item(0);

    try {
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const update = get(this, 'update');
        update(place);
        set(this, 'currentPlace', place);
      });
    } catch(e) {
      if (e.name === 'ReferenceError') {
        console.error('\'google\' reference not found. No internet connection?');
      }
    }
  },

  actions: {
    update(value) {
      set(this, 'value', value);
    },

    clear() {
      get(this, 'update')({});
    },

    onFocusOut() {
      const currentValue = get(this, 'value');
      const currentPlace = get(this, 'currentPlace');

      if ((currentValue === '') ||
          (currentPlace && currentPlace.name !== currentValue)) {
        get(this, 'clear')();
      }
    },
  },
});
