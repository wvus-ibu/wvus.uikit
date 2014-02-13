# Contribute
Whether your a WVUS developer or a vendor, we can always make improvements on our software. The UiKit was created to be platform independent and easily extended.  Find out more in the [docs](http://wvus-ibu.github.io/wvus.uikit).

### Before you start...
In order to compile the World Vision UiKit, there are a couple of prerequisites that need to be installed.

1. Install the [Node Package Manager (npm)](http://nodejs.org/download/)
2. Install [Grunt](http://gruntjs.com/getting-started) using `npm install -g grunt-cli`
3. Run `npm install` in `/path/to/wvus.uikit/src` to install all development dependencies.

Your development environment is now setup!

### Code Standards
The UiKit has adopted the standards of [Twitter Bootstrap](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md#code-guidelines). The major exception is to use semicolons in JavaScript.
The other major requirement is to submit unit tests with new jQuery plugins.

There is also a `.editorconfig` file (adopted from Bootstrap) to set the guidelines in popular text editors.


### Code Submission Guidelines
The UiKit uses most of the same code standards as Bootstrap, however, when developing new components there are some things we would like you to do.
#### Pull Requests

1. Follow Github's standard of [Fork & Pull](https://help.github.com/articles/using-pull-requests).
If you are a contractor, World Vision will establish a private Fork for you to use.
2. Create a Feature Branch. Push code of the new feature to this branch. *Note: Feel free to create as many feature branches as needed.
3. Create a Pull Request. Click Compare & review and set the base to the `wvus-ibu` fork. If you are applying a fix to the current version, set the branch to `master`, otherwise set the branch to `uikit-wip`.  *Be sure to add a description of what changed.

Once a Pull Request is submitted, the World Vision Development team will be notified and will review the changes.


### Customize
To customize the World Vision UiKit, put custom World Vision files in the corresponding img, js, or less folders located at `src/lib/worldvision`.

* Modify `variables.less` & `wv-styles.less` for custom CSS
* Create or modify JavaScript files in the `js` folder
* Add images to the `img` folder
* Run `grunt` under src directory to compile the LESS and JS, and create a zip. *See options below.

*Note: Do NOT modify the libraries in the `wvus.uikit/src/lib` except for `worldvision`.  These 3rd party libraries must be kept original in order for the UiKit to compile correctly.

####Grunt Tasks
[Grunt](http://gruntjs.com/getting-started) is a task runner that automates simple tasks during development. The UiKit includes several tasks to make compiling and updating easier.

*Note: All tasks are run from the `path/to/wvus.uikit/src` directory.

* `grunt`:  the essential task; Compiles, minifies, and zips to a single zip file
* `grunt update`: updates Bootstrap, jQuery and Font Awesome to the latest stable version from Github
* `grunt watch`: monitors the Grunt config and all LESS files in `lib/worldvision/less`. When changes occur, `grunt watch` compiles the LESS.
* `grunt compile`: compiles LESS and JS (does not minify files. `grunt compile` should be used when simple changes are made otherwise `grunt watch` is the preferred method during development)

