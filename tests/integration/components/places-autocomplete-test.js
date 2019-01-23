import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | places-autocomplete', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('initialValue', 'Berlin');
    await render(hbs`{{places-autocomplete initialValue=initialValue}}`);

    //const wrapperEl = this.element.querySelector('div');
    const inputEl = this.element.querySelector('input');
    assert.equal(inputEl.value, 'Berlin', 'initial input value is set');

    this.set('initialValue', 'Bamberg');
    assert.equal(inputEl.value, 'Berlin', 'input value does not change when initialValue changes');
  });

  test('it accepts placeholder option', async function(assert) {
    await render(hbs`{{places-autocomplete placeholder="Enter location"}}`);
    const actual = this.element.querySelector('input').getAttribute('placeholder');
    const expected = 'Enter location';
    assert.equal(actual,expected);
  });

  test('it renders inputClass attribute', async function(assert) {
    await render(hbs`{{places-autocomplete inputClass="dummy-class"}}`);
    assert.ok(this.element.querySelector('input').classList.contains('dummy-class'));
  });
});
