 /*global module:false*/
 /* jshint node:true */
module.exports = function(grunt) {
  "use strict";
  // Path variables
  var srcPath = '../';
  var libPath = 'lib/';
  var distPath = '../dist/';
  var bootstrapLessPath = libPath + 'bootstrap/less/';
  var bootstrapJsPath = libPath + 'bootstrap/js/';
  var jqueryPath = libPath + 'jquery/';

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
      jquery: {
        src: [
          jqueryPath + 'jquery.js',
          libPath + 'worldvision/namespace.js'
        ],
        dest: distPath + 'js/jquery-custom.js'
      },
      uikit: {
        src: [
            bootstrapJsPath + 'transition.js',
            bootstrapJsPath + 'alert.js',
            bootstrapJsPath + 'button.js',
            bootstrapJsPath + 'carousel.js',
            bootstrapJsPath + 'collapse.js',
            bootstrapJsPath + 'dropdown.js',
            bootstrapJsPath + 'modal.js',
            bootstrapJsPath + 'tooltip.js',
            bootstrapJsPath + 'popover.js',
            bootstrapJsPath + 'scrollspy.js',
            bootstrapJsPath + 'tab.js',
            bootstrapJsPath + 'affix.js',
            libPath + 'bootstrap-select/bootstrap-select.js'
            ],

        dest: '../dist/js/<%= pkg.name %>.js'
      }
  },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      uikit: {
        src: '<%= concat.uikit.dest %>',
        dest: distPath + 'js/<%= pkg.name %>.min.js'
      },
      jquery: {
        src: '<%= concat.jquery.dest %>',
        dest: distPath + 'js/jquery-custom.min.js'
      },
    },

    jshint: {
      options: {
        jshintrc: 'lib/bootstrap/js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dist: {
        src: '<%= concat.uikit.src %>'
      }
    },

    qunit: {
      options: {
        inject: 'lib/bootstrap/js/tests/phantomgrunt.js'
      },
      files: ['lib/bootstrap/js/tests/*.html']
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      less: {
        files: ['lib/worldvision/less/*.less'],
        tasks: ['less', 'csslint']
      },
      js: {
        files: ['lib/worldvision/js/*.js'],
        tasks: ['qunit', 'jshint']
      }
    },

    less: {
      dist:{
        options: {
          outputSourceFiles: true,
          sourceMap: true,
          sourceMapRootpath: 'src/',
          sourceMapFilename: '../dist/css/<%= pkg.name %>.css.map',
        },
        files: {
          '../dist/css/<%= pkg.name %>.css': 'lib/worldvision/less/wvus.uikit.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          keepSpecialComments: 0,
          report: 'min',
        },
        files: {
          '../dist/css/<%= pkg.name %>.min.css': 'lib/worldvision/less/wvus.uikit.less',
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
        src: [distPath + 'css/wvus.uikit.css']
      },
    },

    autoprefixer: {
      options: {
        map: true,
        browsers: ['last 2 versions', 'ie 9', 'android 4.2' ]
      },
      uikit: {
        src: '<%= csslint.lib.src =>'
      }

    },

    csscomb: {
      options: {
        config: 'lib/worldvision/less/.csscomb.json'
      },
      dist: {
        files: {
          '../dist/css/<%= pkg.name %>.css': '../dist/css/<%= pkg.name %>.css',
        }
      }
    },

    usebanner:{
      css: {
        options: {
          position: 'top',
          banner: '<%=banner=>',
        },
        files: {
          src: [
          distPath + 'css/wvus.uikit.css',
          distPath + '../dist/css/wvus.uikit.min.css',
          distPath + '../dist/css/wvus.uikit.theme.css',
          distPath + '../dist/css/wvus.uikit.theme.min.css'
          ]
        }
      }
    },

    copy: {
      images: {
        files: [
          {expand: true, cwd: 'lib/worldvision/img', src: '**/*', dest: '../dist/img'}
        ]
      },
      variables: {
        files: [
          {expand:true, flatten: true, cwd: '../', src: ['src/lib/worldvision/less/variables.less', 'src/lib/worldvision/less/mixins.less'], dest: '../dist/less'},
        ]
      },
      fontawesome: {
        files: [
          {expand: true, cwd: 'lib/font-awesome/fonts', src: '**', dest: '../dist/fonts'}
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
      dist: {
        options: {force:true},
        src:'../<%= pkg.name %>'
      },
      jquery: {
        files: [
          {
            src: ['lib/jquery/**/*', '!lib/jquery/dist/*'],
            filter: 'isFile'
          },
          {src: ['lib/jquery/src']}
        ]
      }
    },

    replace: {
      version: {
        src: ['../js/jquery.js'],
        overwrite: true,
        replacements: [{
          from: '@VERSION',
          to: '<%= pkg.version %>'
        }]
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('dist-css', ['less', 'autoprefixer', 'csscomb', 'usebanner']);

  // Default task. Compile, concatenate, min, and build zip
  grunt.registerTask('default', ['compile', 'copy:variables', 'jshint', 'copy:zipsrc', 'compress', 'clean:dist']);

  //compiles less for errors, runs js thorugh
  //grunt.registerTask('test', ['compile', 'csslint' ,'jshint', 'qunit']);

  // Compiles and concatenates js and less, then copies jquery, the js and css to the docs and to the tests
  grunt.registerTask('compile', ['concat', 'replace', 'less:dist', 'less:distResponsive', 'csscomb', 'less:minify', 'uglify','copy:docs', 'copy:tests']);

};
