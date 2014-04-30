/*global module:false*/
'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.

    watch: {
      docs: {
        options: {
          spawn: false,
          livereload: '<%= connect.docs.options.livereload %>'
        },
        files: ['assets/**/*', 'elements/**/*', 'develop/**/*', 'design/**/*', '_includes/**/*', '_layouts/**/8'],
        tasks: ['jekyll']
      },
      assets: {
        files: ['assets/less/*'],
        tasks: ['less']
      },

    },

    less: {
      docs: {
        options: {
          outputSourceFile: true,
          sourceMap: true,
          sourceMapFilename: 'docs.map.css',
        },
        src: ['assets/less/docs.less'],
        dest: 'assets/css/docs.css'
      }
    },

    jekyll: {
      docs: {}
    },
    connect: {
      docs: {
        options: {
          hostname: 'localhost',
          port: 4000,
          base: '_site',
          livereload: 35729,
          open: 'http://localhost:4000/'
        }
      }
    },
    clean: {
      files: ['_site']
    },
    validation: {
     options: {
      charset: 'utf-8',
      doctype: 'HTML5',
      failHard: true,
      reset: true,
      relaxerror: [
      'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
      'Element img is missing required attribute src.'
      ]
    },
    files: {
      src: '_site/**/*.html'
    }
  }
});

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('serve', ['clean','less', 'jekyll', 'connect', 'watch']);
  grunt.registerTask('test', ['jekyll', 'validation']);
};
