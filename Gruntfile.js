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
        doctype: "HTML5",
        failHard: true
      },
      src: ['_site/**/*.html']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');

  var testTasks = [],
  testBranches = ['docs-2.0', 'gh-pages', 'pages'];

  if(testBranches.indexOf(process.env.TRAVIS_BRANCH) !== -1){
    testTasks = testTasks.concat(['jekyll', 'validate-html']);
  }

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('docs', ['watch', 'connect']);
  grunt.registerTask('test', testTasks);
};
