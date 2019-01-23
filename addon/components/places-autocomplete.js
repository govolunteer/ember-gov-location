import Component from '@ember/component';
import layout from '../templates/components/places-autocomplete';

export default Component.extend({
  layout,
  classNames: ['c-places-autocomplete'],
  value: '',

  currentPlace: null,

  init() {
    this._super(...arguments);

    const initialValue = this.get('initialValue');
    if (initialValue) {
      this.set('value', initialValue);
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

    const componentRestrictions = this.get('restrictions');

    const options = {
      types: ['geocode'],
      componentRestrictions,
    };

    const input = this.element.children.item(0);

    try {
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.get('update')(place);
        this.set('currentPlace', place);
      });
    } catch(e) {
      if (e.name === 'ReferenceError') {
        console.error('\'google\' reference not found. No internet connection?');
      }
    }
  },

  actions: {
    onFocusOut() {
      const currentValue = this.get('value');
      const currentPlace = this.get('currentPlace');

      if (currentValue === '' ||
          currentPlace && currentPlace.name !== currentValue) {
        this.set('value', '');
        this.set('currentPlace', null);
        this.get('update')(null);
      }
    },
  },
});
