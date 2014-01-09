 /*global module:false*/
 /* jshint node:true */
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    /*
    Concat JS
     */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      distJquery: {
        src: [
          'lib/jquery/jquery.js',
          'lib/jquery/noconflict-jquery.js'
        ],
        dest: '../js/jquery.js'
      },
      dist: { //core
        src: [
            'lib/bootstrap/js/bootstrap-transition.js',
            'lib/bootstrap/js/bootstrap-alert.js',
            'lib/bootstrap/js/bootstrap-button.js',
            'lib/bootstrap/js/bootstrap-carousel.js',
            'lib/bootstrap/js/bootstrap-collapse.js',
            'lib/bootstrap/js/bootstrap-dropdown.js',
            'lib/bootstrap/js/bootstrap-modal.js',
            'lib/bootstrap/js/bootstrap-tooltip.js',
            'lib/bootstrap/js/bootstrap-popover.js',
            'lib/bootstrap/js/bootstrap-scrollspy.js',
            'lib/bootstrap/js/bootstrap-tab.js',
            'lib/bootstrap/js/bootstrap-typeahead.js',
            'lib/bootstrap/js/bootstrap-affix.js',
            'lib/bootstrap-select/bootstrap-select.js'],

        dest: '../js/<%= pkg.name %>.js'
      }
  },
    /*
    Minify JS
     */
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '../js/<%= pkg.name %>.min.js'
      },
      distJquery: {
        src: '../js/jquery.js',
        dest: '../js/jquery.min.js'
      },
      modernizer: {
        src: 'lib/modernizer/modernizer.js',
        dest: '../js/modernizer.min.js'
      }
    },

    //JS Linter
    jshint: {
      options: {
        jshintrc: 'lib/bootstrap/js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dist: {
        src: '<%= concat.dist.src %>'
      }
    },

    //qUnit Tests
    qunit: {
      options: {
        inject: 'lib/bootstrap/js/tests/phantomgrunt.js'
      },
      files: ['lib/bootstrap/js/tests/*.html']
    },

    //Auto loads/compiles less and
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      wvless: {
        files: ['lib/worldvision/less/*.less'],
        tasks: ['less', 'copy:docs']
      },
    },
    /*
    Compile, Minify less and generate source maps
     */
    less: {
      dist:{
        options: {
          outputSourceFiles: true,
          sourceMap: true,
          sourceMapRootpath: 'src/',
          sourceMapFilename: '../css/<%= pkg.name %>.css.map',
        },
        files: {
          '../css/<%= pkg.name %>.css': 'lib/worldvision/less/wvus.uikit.less'
        }
      },
      distResponsive: {
        options: {
          outputSourceFiles: true,
          sourceMap: true,
          sourceMapRootpath: 'src/',
          sourceMapFilename: '../css/<%= pkg.name %>.responsive.css.map',
          sourceMapURL: '<%= pkg.name %>.responsive.css.map'
        },
        files: {
          '../css/<%= pkg.name %>.responsive.css': 'lib/worldvision/less/wvus.uikit.responsive.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: {
          '../css/<%= pkg.name %>.min.css': 'lib/worldvision/less/wvus.uikit.less',
          '../css/<%= pkg.name %>.responsive.min.css': 'lib/worldvision/less/wvus.uikit.less'
        }
      }
    },
    csslint: {
      lib: {
        options: {
          csslintrc: 'lib/worldvision/less/.csslintrc',
          formatters: [
            {id: 'text', dest: 'csslint-lib.txt'}
          ],
        },
        src: [
          '../css/wvus.uikit.css',
          '../css/wvus.uikit.responsive.css',
        ]
      },
      docs: {
        options: {
          csslintrc: '../docs/assets/css/.csslintrc',
          formatters: [
            {id: 'text', dest: 'csslint-docs.txt'}
          ],
        },
        src: [
          '../docs/assets/css/developer-docs.css'
        ]
      }
    },
    copy: {
      images: {
        files: [
          {expand:true, cwd:'lib/font-awesome/font', src: '*', dest: '../font'},
          {expand:true, cwd:'lib/worldvision/img', src: '**/*', dest: '../img'}
        ]
      },
      variables: {
        files: [
          {expand:true, flatten: true, cwd: '../', src: ['src/lib/worldvision/less/variables.less', 'src/lib/worldvision/less/mixins.less'], dest: '../less'},
        ]
      },
      zipsrc: {
        files: [
          {
            expand: true,
            cwd: '../',
            src: [
                  'Contribute.md',
                  'css/**',
                  'less/**',
                  'font/**',
                  'img/**',
                  'js/**',
                  'README.md',
            ],
            dest: '../<%= pkg.name %>'
          }
        ]
      },
      //copies js & css to docs
      docs: {
        files: [
          {expand:true, cwd: '../css', src: '*', dest: '../docs/assets/wvus.uikit/css'},
          {expand:true, cwd: '../js', src: ['jquery.min.js', 'wvus.uikit.*', 'modernizer.min.js'], dest: '../docs/assets/wvus.uikit/js'},
          {expand:true, cwd: '../font', src: '*', dest: '../docs/assets/wvus.uikit/font'},
          {expand:true, cwd: '../img', src: '*/**', dest: '../docs/assets/wvus.uikit/img'},
        ]
      },
      // copies the namespace jquery to the tests
      tests: {
        files: [
          {expand:true, cwd: '../js', src: 'jquery.js', dest: 'lib/bootstrap/js/tests/vendor'}
        ]
      }
    },
    compress: {
      zip: {
        options: {
          mode: 'zip',
          archive: '../<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          {expand:true, cwd: '../', src: '<%= pkg.name %>/**', dest:'../'}
        ]
      }
    },
    clean: {
      options: {force:true},
      src:'../<%= pkg.name %>'
    },
    jekyll: {
       options: {
          src: '../docs',
          dest: '../docs/_site',
          config: '../docs/_config.yml',
        },
      build: {
        options:{
          raw: 'baseurl: http://localhost:4000\n',
        }
      }
    },
    validation: {
      options: {
        reset: true,
        failHard: true,
        doctype: 'HTML5',
        relaxerror: ["\"[.*]+\"Please be sure to test, and consider using a polyfill."],
      },
      files: {
        src: ['../docs/_site/**/*.html']
      }
    },
    connect: {
      jekyll: {
        options: {
          base: '<%= jekyll.options.dest %>',
          hostname: 'localhost',
          port: 4000,
          open: 'http://localhost:4000/',
          keepalive: true,
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // Default task. Compile, concatenate, min, and build zip
  grunt.registerTask('default', ['concat', 'uglify', 'less', 'copy:docs', 'copy:images', 'copy:tests','copy:variables', 'jshint', 'copy:zipsrc', 'compress', 'clean']);

  //compiles less for errors, runs js thorugh
  grunt.registerTask('test', ['less', 'csslint:lib' ,'jshint', 'qunit']);

  // Compiles and concatenates js and less, then copies jquery, the js and css to the docs and to the tests
  grunt.registerTask('compile', ['concat', 'less', 'copy:docs', 'copy:tests']);

  // Serves the docs locally
  grunt.registerTask('docs', ['jekyll', 'connect:jekyll']);

  // build the docs and validate the html
  grunt.registerTask('validate', ['jekyll','csslint:docs', 'validation']);

};
