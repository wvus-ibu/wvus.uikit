# Contribute
Whether your a WVUS developer or a vendor, we can always make improvements on our software. The UiKit was created to be platform independent and easily extended.  Find out more in the [docs](http://wvus-ibu.github.io/wvus.uikit).

### Before you start...
In order to compile the World Vision UiKit, there are a couple of prerequisites that need to be installed.

1. Install the [Node Package Manager (npm)](http://nodejs.org/download/)
2. Install [Grunt](http://gruntjs.com/getting-started) using `npm install -g grunt-cli`
3. Run `npm install` in `/path/to/wvus.uikit/src` to install all development dependencies.

Your development environment is now setup!

To update the libraries (Bootstrap, jQuery, Font Awesome) in the World Vision UiKit:
*Node Package Manager needs to be installed (See above)

* Run `grunt update`

This will update jQuery, Bootstrap, and Font Awesome or output any errors.

### Customize
To customize the World Vision UiKit, put custom World Vision files in the corresponding img, js, or less folders located at src/lib/worldvision/.

* Modify `variables.less` & `mixins.less` for custom CSS
* Create or modify JavaScript files in the `js` folder
* Add images to the `img` folder
* Run `grunt` under src directory to compile the css and js, and create a zip of the UiKit for you to merge into the repository.

*Note: Do NOT modify the libraries in the `wvus.uikit/src/lib` except for `worldvision`.  These 3rd party libraries must be kept original in order for the UiKit to compile correctly.