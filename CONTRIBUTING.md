# Contribute
Whether your a WVUS developer or a vendor, we can always make improvements on our software. The UiKit was created to be platform independent and easily extended.  Find out more in the [docs](http://wvus-ibu.github.io/wvus.uikit).

### Before you start...
In order to compile the World Vision UiKit, there are a couple of prerequisites that need to be installed.

1. Install the [Node Package Manager (npm)](http://nodejs.org/download/)
2. Install [Grunt](http://gruntjs.com/getting-started) using `npm install -g grunt-cli`
3. Run `npm install` in `/path/to/wvus.uikit/src` to install all development dependencies.

Your development environment is now setup!

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