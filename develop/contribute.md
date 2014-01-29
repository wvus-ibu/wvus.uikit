---
layout: content
title: Contribute
name: contribute
---
### Contribute

Whether you're a WVUS developer or a vendor, we can always make improvements. The UiKit was created to be platform independent and easily extended.

#### Before you start...

In order to build the World Vision UiKit, there are a couple of prerequisites that need to be installed:

1. Install the [Node.js Package Manager (npm)](http://nodejs.org/)
2. Install [Grunt](http://gruntjs.com/) using `npm install -g grunt-cli`
3. Run `npm install` in `/path/to/wvus.uikit/src` to install all development dependencies

You’re ready to start building out the uikit!

### Code Standards

The UiKit has adopted the standards of [Twitter Bootstrap](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md#code-guidelines). The major exception is to use semicolons in JavaScript.

There is also a `.editorconfig` file (adopted from Bootstrap) to set the guidelines in popular text editors.

### Compiling CSS and JavaScript
The UiKit uses [Grunt](http://gruntjs.com/) to build out and quickly run tasks to compile code.  If you haven't used Grunt before, [start here](http://gruntjs.com/getting-started) to get an overview or jump right in with running some of the tasks listed below.

### Available Grunt Commands

`grunt` build out the uikit; run tests, copy files, compile and minify less, concatenate and minify js, create zip package

`grunt test` run the tests independently; compiles less (checks for errors), runs jshint, qunit

`grunt compile` compile the less and concatenate the js independently,

`grunt watch` convenience task to compile less, in real time, as it is edited

`grunt docs` serves the docs locally; must have Jekyll installed (see github docs readme)

`grunt validate` validates the html of the docs

### Dependencies
The UiKit depends on several libraries which provide the base functionality.  Thanks go out to the developers behind [Twitter Bootstrap]({{ site.bootstrap }}), [Font Awesome]({{ site.font-awesome }}) and [jQuery]({{ site.jquery }}). Ideas were also inspired by [Zurb Foundation](http://foundation.zurb.com/) and [Fuel UX](http://exacttarget.github.io/fuelux/).
