---
layout: docsdashboard
title: Pills - Disabled
snippet: pills
group: pills
hasJs: false
---
<header class="page-header" id="headerTitle">
    <h1>{{page.title}}</h1>
    <p class="subheader lead">
      {% if page.description %}
        {{ page.description }}
      {% else %}
      This is a placeholder for an awesome description.
    {% endif %}
    </p>
</header>
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


