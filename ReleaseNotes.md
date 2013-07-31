# Release Notes

## Work In Progress
* Checkout the project issue tracker [wvus-ibu/wvus.uikit](https://github.com/wvus-ibu/wvus.uikit/issues?state=open) and current [pull requests](https://github.com/wvus-ibu/wvus.uikit/pull/7) 

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