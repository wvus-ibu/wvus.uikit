# Release Notes

## Work In Progress
* Checkout the project issue tracker [wvus-ibu/wvus.uikit](https://github.com/wvus-ibu/wvus.uikit/issues?state=open) and current [pull requests](https://github.com/wvus-ibu/wvus.uikit/pull/7) 

## 1.1.0
* Update Buttons 
* Update Tabs 
* Remove Background of breadcrumbs
* Update left/right tabs
* Update Pager
* Update Tables

## 1.0
* Consolidated each group of components into their own page
* Added Unit tests from Bootstrap
* Setup Travis CI to run tests when commits are made to the repo
* Renamed the JS & CSS files to remove the all, extra and core identifiers
* Changed the docs to reflect the new names
* Added new tasks to Grunt to lint the js, run unit tests and validate the HTML in the docs


## 0.4.2
* Added WV Styled navbar
* Styled Tooltips and Popovers
* Styled Contextual classes
* Updated Docs to reflect new namespaces
* Jekyll-ify the CSS Test files
* Minor Bug Fixes

## 0.4.2-beta
* Updated Holder.js and html5shiv.js to work with IE<9
* Finishing Branding 
* Namespaced CSS and JS to use `wvus-uikit` and `wvusUikit`, respectively
* Bug Fixes

## 0.4.1 Continue Branding
* Finished branding of buttons, pagination, tables, breadcrumbs, carousel, accordion, tabs, pills, stackable tabs & pills
* Setup `grunt watch` to watch files in `lib/worldvision/less`
* Added some variables for futher customization of text
* Restructured customization file; `wv-styles.less` is the WVUS Branding Overrides to Bootstrap's base
* Minor text changes to documentation

## 0.4 Branding
* Styled buttons, tables, breadcrumbs, pagination and navigation 
* Added contribution link to docs
* Added Release Notes page
* Minor organization tweaks to the docs

## 0.3 Documentation
* Reorganized the Bootstrap docs 
* Setup plan to store historical documentation
* Created this - Release Notes - and repo docs
* Built Docs in Jekyll format
* Hosted docs on GitHub Pages
* Created Cheatsheet (PDF) of Font Awesome glyphs
* Fixed minor bugs

## 0.2 Removal of Fuel UX
* Removed Fuel UX - caused issues and didn't provide the extras that we really need
* Created three types of the CSS and JS - All, Core, Extra.
* Integrated Font Awesome in to Core
* Simplified updating libraries with shell script and Grunt plugins
* Fixed docs to point at WV source JS
* Add Grunt task `grunt compile` to compile less and js, and not create the zip.

## 0.1 Initial Release
* Combined Bootstrap, Fuel UX and jQuery
* Organized file structure so vendor libraries and all source files are stored in src folder
* Production ready files stored in the root of the repo with copy of bootstrap docs
* Packaged with NodeJS
* Compiled and compressed to zip for easy distribution
* Create initial docs to compile and compress 