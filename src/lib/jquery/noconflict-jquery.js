/* Establishes wvusUikit as the object to use with UiKit JS plugins*/
var wvusUikit = jQuery.noConflict(true);

wvusUikit.fn.extend({
  version: "@VERSION",
});
