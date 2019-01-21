import Component from '@ember/component';
import layout from '../templates/components/places-autocomplete';
import { get, set } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['c-places-autocomplete'],
  value: '',

  currentPlace: null,

  didReceiveAttrs() {
    this._super(...arguments);

    const initialValue = get(this, 'initialValue');
    if (initialValue) {
      set(this, 'value', initialValue);
    }
  },

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

    onFocusOut() {
      const currentValue = get(this, 'value');
      const currentPlace = get(this, 'currentPlace');
      const update = get(this, 'update');

      if (currentValue === '') {
        update({});
      }

      if (currentPlace && currentPlace.name !== currentValue) {
        update({});
      }
    },
  },
});
