import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | places-autocomplete', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('initialValue', 'Berlin');
    this.set('placeholder', 'Enter location');

    await render(hbs`{{places-autocomplete initialValue=initialValue placeholder=placeholder}}`);

    //const wrapperEl = this.element.querySelector('div');
    const inputEl = this.element.querySelector('input');

    assert.equal(inputEl.value, 'Berlin', 'initial input value is set');
    assert.equal(inputEl.getAttribute('placeholder'), 'Enter location', 'placeholder is set');

    this.set('initialValue', 'Bamberg');
    assert.equal(inputEl.value, 'Berlin', 'input value does not change when initialValue changes');
  });
});
