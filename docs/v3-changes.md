---
layout: content
title: Changes in version 3
name: v3-changes
path: ../
---

#### Removal of 3rd party libraries

Some 3rd party libraries are being removed to reduce the size and avoid conflicts with other libraries. These libraries already work as stand alone libraries and are suggested when using UiKit. However, they will not be supported or included in v3.

The following list of libraries are deprecated and will be removed in version 3:

* [modernizr](http://modernizr.com/): This will be removed to reduce size but is still suggested. Mondernizr would be very useful for getting some of the graphics to work with legacy browsers
* [Spin.js]({{ site.spinjs}}): Removed to reduce size and easily maintain dependency management. It will work with UiKit, however, because of its rare use it is being removed.
* [Video JS]({{ site.videojs }}): Removed to reduce size and conflicts. VideoJS will only be used for custom created media. If a video is already hosted on YouTube, the native YouTube player should be used.
* [VideoJS Youtube plugin](https://github.com/eXon/videojs-youtube): Removed to reduce size and conflicts. The plugin will be removed since the native YouTube player will be used.


*Special Note*: The jQuery namespace and library will be removed. The namespace is being changed to be an alias of the jQuery object. This will stop the alteration of core libraries like Bootstrap JS plugins and 3rd party Bootstrap plugins. This will make updating these libraries simple.

The packaged jQuery library will be removed from the UiKit, but will still be a dependency. The recommended version will be available through [Bower](http://bower.io/) and when installing UiKit with Bower, will download the supported version. Currently, UiKit follows Bootstrap's conventions and dependencies.