---
layout: docsdashboard
title: Pills - Disabled
snippet: pills
group: pills
hasJs: false
---
          <!-- Preview -->
          <div class="row-fluid">
            <div class="docs-example">
              <ul class="nav nav-pills">
                <li>
                  <a href="#">Clickable</a>
                </li>
                <li class="disabled">
                  <a href="#">Disabled</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- HTML Code -->
          <div class="row-fluid">
            <div class="docs-html">
{% highlight html  %}
<ul class="nav nav-pills">
  <li>
    <a href="#">Clickable</a>
  </li>
  <li class="disabled">
    <a href="#">Disabled</a>
  </li>
</ul>
{% endhighlight %}
            </div>
          </div>

{% if page.hasJs %}
          <!-- JS Code -->
          <div class="row-fluid">
            <div class="docs-html">
{% highlight js %}

{% endhighlight %}
            </div>
          </div>
{% endif %}


