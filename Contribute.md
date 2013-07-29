### Prerequisites
In order to compile the World Vision UiKit, there are a couple of prerequisites that need to be installed.
1. Install the [Node Package Manager (npm)](http://nodejs.org/download/)
2. Install [Grunt](http://gruntjs.com/getting-started) using `npm install -g grunt-cli`
That will allow the World Vision US UiKit to be compiled

To update the libraries in the World Vision UiKit:
* Node Package Manager needs to be installed (See above step 1)
1. Install [Volo](http://volojs.org/) `npm install -g volo`
2. Navigate to src/ directory
3. Run `grunt update`
This will update jQuery, Bootstrap, and Font Awesome.

### Customize
To customize the World Vision UiKit, put custom World Vision files in the corresponding img, js, or less folders located at src/lib/worldvision/.

* Modify variables.less for custom CSS
* Create or modify js files 
* Include images 
* Run `grunt` under src directory to generate the css, js, img folders and zip archive.
