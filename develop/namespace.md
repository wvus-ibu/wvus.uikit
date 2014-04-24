---
layout: content
title: Namespace
name: namespace
path: ../../
---
The UiKit uses a namespace to stop CSS and JavaScript collisions.

### Less
The namespace used for the less is `wvusUikit`.  Apply this class to the `<html>` element in your site.
{% highlight html hl_lines=2 %}
<!DOCTYPE html>
<html class="wvusUikit">
...
{% endhighlight %}

### jQuery

The UiKit uses a custom version of the popular [jQuery]({{ site.jquery }}) library.  Normally, jQuery uses the `$` alias and the `jQuery` object.  This has been removed in the UiKit version of jQuery to stop 3rd party jQuery code from conflicting the UiKit components and widgets.

To use the UiKit jQuery, substitute the `$` or `jQuery` objects with `wvusUikit`.
{% highlight js %}
// Standard jQuery syntax
$('a').click(function(){
  // do stuff
});

// UiKit syntax
wvusUikit('a').click(function(){
  // do stuff
};
{% endhighlight %}

For writing longer JavaScript files using the UiKit jQuery, use an [Immediately Invoked Function Expression](http://learn.jquery.com/javascript-101/functions/#immediately-invoked-function-expression-iife).  This expression is commonly used when creating plugins and will allow the use of an alias for easier development.
{% highlight js %}
// $ is the alias
(function($){

  $('a').click(function(){
    // do stuff
  });

// wvusUikit is the namespace
})(wvusUikit);
{% endhighlight %}
