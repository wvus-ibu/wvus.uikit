/* Establishes wvusUikit as the object to use with UiKit JS plugins*/
var wvusUikit = jQuery.noConflict(true);

var version = "@VERSION";
wvusUikit.fn.extend({
  version: version,
});
