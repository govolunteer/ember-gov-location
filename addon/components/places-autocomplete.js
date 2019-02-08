import Component from '@ember/component';
import layout from '../templates/components/places-autocomplete';
import { get, set } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,
  classNames: ['c-places-autocomplete'],
  value: '',
  currentPlace: null,

  didReceiveAttrs() {
    this._super(...arguments);
    let initialValue = get(this, 'initialValue');
    set(this, 'value', initialValue || '');
  },

  didInsertElement() {
    this._super(...arguments);

    let componentRestrictions = get(this, 'restrictions');

    const options = {
      types: ['geocode'],
      componentRestrictions,
    };

    const input = this.element.children.item(0);

    try {
      let autocomplete = new google.maps.places.Autocomplete(input, options);
      let listener = autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        set(this, 'currentPlace', place);
        get(this, 'update')(place);
      });
      // We need to remove the listener later.
      set(this, 'autoCompleteListener', listener);
    } catch(e) {
      if (e.name === 'ReferenceError') {
        console.error('\'google\' reference not found. No internet connection?');
      }
    }
  },

  willDestroyElement() {
    let listener = get(this, 'autoCompleteListener');
    if (isPresent(listener)) {
      listener.remove();
    }
  },

  actions: {
    onFocusOut() {
      if (get(this, 'value') === '') {
        set(this, 'value', '');
        set(this, 'currentPlace', null);
        get(this, 'update')(null);
      }
    },
  },
});
