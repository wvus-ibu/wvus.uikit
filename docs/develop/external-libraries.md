---
layout: content
title: External Libraries
name: external-libraries
path: ../../
---
Aside from the UiKit being built completely built on [Bootstrap]({{ site.bootstrap }}) and [Font Awesome]({{ site.font-awesome }}), it can work with other libraries. Below are known libraries that work with UiKit

### Spin.js
[Spin.js]({{ site.spinjs }}) dynamically creates spinning activity indicators that can be used as resolution-independent replacement for AJAX loading GIFs.


<div class="spin-example">
  <span id="spin"></span>
</div>


The easiest way to use Spin.js is with jQuery. Spin.js is not dependent on jQuery, however, jQuery is required for the UiKit so let's use the Spin.js jQuery plugin (included in the UiKit).


{% highlight html %}
<div id="spin-example"></div>
{% endhighlight %}
{% highlight js %}
wvusUikit('#spin-example').spin();
{% endhighlight %}

#### Turning off
Turning off Spin.js after the activity has finished is just as easy as starting it. Just call `wvusUikit('#spin').spin(false);`

#### Presets
Spin.js has several prebuilt presets that can be used like small and large. The UiKit has opted to use the default for simplicity but feel free to create your own presets. Below is an example of a preset definition. Documentation on preset values can be found [here]({{ site.spinjs }}}#usage)
{% highlight js%}
// Using Presets:
// ==============

$('#el').spin('small'); // Creates a 'small' Spinner using the text color of #el.
$('#el').spin('large', '#fff'); // Creates a 'large' white Spinner.

// Adding a custom preset:
// =======================

$.fn.spin.presets.flower = {
  lines: 9
  length: 10
  width: 20
  radius: 0
}

$('#el').spin('flower', 'red');
{% endhighlight %}

### Video.js

[Video.js]({{ site.videojs }}) is a JavaScript and CSS library that makes it easier to work with and build on HTML5 video. This is also known as an HTML5 Video Player. Video.js provides a common controls skin built in HTML/CSS, fixes cross-browser inconsistencies, adds additional features like fullscreen and subtitles, manages the fallback to Flash or other playback technologies when HTML5 video isn't supported, and also provides a consistent JavaScript API for interacting with the video.

The UiKit has a custom skin built for VideoJS 4.3.0. This means that any video used with Video.js and the UiKit will receive World Vision styled controls.

This is not included by default. If you wish to use the World Vision VideoJS skin, uncomment the `video-js-skin.js` in the `precompile.less` file. Then run `grunt` being sure you have `npm` and `grunt-cli` along with the dependencies installed.

Documentation for Video.js can be found [here]({{ site.videojs-docs }})
