---
layout: content
title: Version
name: version
path: ../../
---

The UiKit uses the semantic version scheme of &lt;major&gt;.&lt;minor&gt;.&lt;patch&gt;.  More details can be found here at [SemVer.org](http://semver.org/).

### JavaScript
Easily determine the version of the UiKit using JavaScript.  `wvusUikit.fn.version` will return the version in a string.

{% highlight javascript %}
alert("The version of the UiKit you are using is " + wvusUikit.fn.version);

// Output
"The version of the UiKit you are using is {{ site.uikit-version }}"
{% endhighlight %}
