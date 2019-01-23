ember-gov-location
==============================================================================

[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-gov-location
```


Usage
------------------------------------------------------------------------------

### Options:

**option**             | **description**
---                    | ---                 |
initialValue           | Initial value of the input, set only at component creation (string)
inputId                | id for input element (string)
inputClass             | additional class for input element (string)
inputTabindex          | tabindex value for input element (string)
inputDisabled          | whether input element is disabled (bool, optional)
placeholder            | placeholder attribute for input element (string)
update                 | update callback that receives the Google Places suggestion object (func)
types                  | types option for Google Places API (string)
restrictions           | componentRestrictions for Google Places API (string)


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
