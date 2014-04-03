/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.

    watch: {
      docs: {
        options: {
          livereload: '<%= connect.docs.options.livereload %>'
        },
        files: ['tests/*'],
        tasks: ['jekyll']
      }
    },
    jekyll: {
      docs: {}
    },
    connect: {
      docs: {
        options: {
          hostname: 'localhost',
          port: '4000',
          base: '_site',
          keepalive: true,
          livereload: 35729
        }
      }
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

  var testTasks = [],
  testBranches = ['docs-2.0', 'gh-pages', 'pages'];

  if(!process.env.TRAVIS_BRANCH || testBranches.indexOf(process.env.TRAVIS_BRANCH) !== -1){
    testTasks = testTasks.concat(['jekyll', 'validation']);
  }

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('docs', ['watch', 'connect']);
  grunt.registerTask('test', testTasks);
};
