---
layout: content
title: Including the files
name: include
---
### File Structure
The compiled library contains the necessary files to get up and running:

{% highlight html %}
wvus.uikit/
    ├── css/
    │   ├── wvus.uikit.css
    │   ├── wvus.uikit.min.css
    │   ├── wvus.uikit.responsive.css
    │   ├── wvus.uikit.responsive.min.css
    ├── js/
    │   ├── jquery.js
    │   ├── jquery.min.js
    │   ├── wvus.uikit.js
    │   ├── wvus.uikit.min.js
    ├── img/
    │   ├── ico/
    │   │   ├── (favicons)
    │   └── caption-background.png
    ├── less/
    │   ├── variables.less
    │   ├── mixins.less
    │   ├── starter.less
    └── font/
        ├── FontAwesome.otf
        ├── fontawesome-webfont.eot
        ├── fontawesome-webfont.svg
        ├── fontawesome-webfont.ttf
        └── fontawesome-webfont.woff
{% endhighlight %}

### Include
Including the UiKit is simple:

Add the CSS files:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <!-- CSS (use minified versions on production sites) -->
    <link rel="stylesheet" type="text/css" href="/path/to/uikit/css/wvus.uikit.min.css">
    <!-- Optional responsive styles for mobile -->
    <link rel="stylesheet" type="text/css" href="/path/to/uikit/css/wvus.uikit.responsive.min.css">
  </head>
  <body>
...

{% endhighlight %}

Add the JavaScript files:
{% highlight html %}
...
    <!-- Namespaced jQuery -->
    <script src="/path/to/uikit/js/jquery.min.js"></script>
    <script src="/path/to/uikit/js/wvus.uikit.min.js"></script>
  </body>
</html>
{% endhighlight %}
Add the CSS namespace:
{% highlight html hl_lines=2%}
<!DOCTYPE html>
<html class="wvus-uikit">
  <head>
...
{% endhighlight %}

<span class="label label-info">Note:</span> the UiKit uses a CSS and JavaScript namespace. See [namespace]({{ site.baseurl }}{{ site.develop }}/namespace) section.


### Project Use

If the compiled CSS doesn’t provide enough flexibility for your project, we have that covered. The variables.less and mixins.less have been extracted to be included in a projects stylesheet.

* Variables.less contains all of the colors, fonts, and basic sizing
* Mixins.less contains mixins for easily creating background effects, applying border radius, gradients, etc

Include both of these in a LESS file to use with custom styles for a site. A starter.less can be found in the less folder.

Example less file:
{% highlight css %}
/* Start a less file by importing the variables.less and mixins.less */
@import "/path/to/uikit/less/variables.less";
@import "/path/to/uikit/less/mixins.less";

/* Start LESS code */
{% endhighlight %}

<span class="label label-info">FYI:</span> Be sure to checkout the [LESS docs](http://www.lesscss.org/) for more help