 /*global module:false*/
 /* jshint node:true */
module.exports = function(grunt) {
  "use strict";
  // Path variables
  var srcPath = './',
      libPath = srcPath + 'lib/',
      distPath = srcPath + 'dist/',
      bootstrapPath = libPath + 'bootstrap/',
      bootstrapLessPath = bootstrapPath + 'less/',
      bootstrapJsPath = bootstrapPath + 'js/',
      bootstrapSelectPath = libPath + 'bootstrap-select/',
      fontAwesomePath = libPath + 'font-awesome/',
      jqueryPath = libPath + 'jquery/',
      datepickerPath = libPath + 'bootstrap-datepicker/',
      videojsPath = libPath + 'videojs/dist/video-js/',
      videojsYoutubePath = libPath + 'videojs-youtube/',
      spinjsPath = libPath + 'spin.js/',
      worldVisionPath = libPath + 'worldvision/';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n',

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
          jqueryPath + 'dist/jquery.js',
          worldVisionPath + 'js/namespace.js'
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
            datepickerPath + 'js/bootstrap-datepicker.js',
            bootstrapSelectPath + 'bootstrap-select.js',
            videojsPath + 'video.dev.js',
            spinjsPath + 'spin.js',
            spinjsPath + 'jquery.spin.js'
            ],

        dest: distPath + 'js/<%= pkg.name %>.js'
      }
  },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      jquery: {
        src: '<%= concat.jquery.dest %>',
        dest: distPath + 'js/jquery-custom.min.js'
      },
      uikit: {
        src: '<%= concat.uikit.dest %>',
        dest: distPath + 'js/<%= pkg.name %>.min.js'
      },

    },

    jshint: {
      options: {
        jshintrc: worldVisionPath + 'js/.jshintrc'
      },
      gruntfile: {
        options: {
            curly : true,
            eqeeq: true,
            newcap: true,
            noarg : true,
            node  : true,
            nonbsp: true,
            strict: true,
            undef : true
        },
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
        tasks: ['dist-css', 'copy:docs']
      },
      js: {
        files: ['lib/worldvision/js/*.js'],
        tasks: ['qunit', 'jshint']
      }
    },

    comments: {
      lib: {
        options: {
          singleline: false,
          multiline: true
        },
        src: [bootstrapLessPath + '*.less',
        fontAwesomePath + 'less/*.less',
        datepickerPath + 'less/datepicker3.less',
        bootstrapSelectPath + 'bootstrap-select.less',
        worldVisionPath + 'less/video-js-skin.less']
      }
    },

    less: {
      dist: {
        options: {
          outputSourceFiles: true,
          sourceMap: true,
          sourceMapFilename: distPath + 'css/<%= pkg.name %>.css.map',
          sourceMapRootpath: srcPath,
          sourceMapURL: '<%= pkg.name %>.css.map'
        },
        src: worldVisionPath + 'less/wvus.uikit.less',
        dest: distPath + 'css/<%= pkg.name %>.css'
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: [
          {src: ['<%= less.dist.dest %>'], dest: distPath + 'css/<%= pkg.name %>.min.css'},
        ]
      }
    },

    csslint: {
      lib: {
        options: {
          csslintrc: worldVisionPath + 'less/.csslintrc',
          formatters: [
            {id: 'text', dest: 'csslint-lib.txt'}
          ],
        },
        src: ['<%= less.dist.dest %>']
      },
    },

    autoprefixer: {
      options: {
        map: true,
        browsers: ['last 2 versions', 'ie 9', 'android 4.2' ]
      },
      dist: {
        src: '<%= less.dist.dest =>'
      },
    },

    csscomb: {
      options: {
        config: worldVisionPath + 'less/.csscomb.json'
      },
      dist: {
        src: '<%= less.dist.dest %>',
        dest: '<%= less.dist.dest %>'
      },
    },

    usebanner:{
      css: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: false,
        },
        files: {
          src: [
            '<%= less.dist.dest %>',
            distPath + 'css/<%= pkg.name %>.min.css'
          ]
        }
      }
    },

    copy: {
      images: {
        files: [
          {expand: true, cwd: worldVisionPath + 'img', src: '**/*', dest: distPath + 'img'}
        ]
      },
      variables: {
        files: [
          {expand:true, flatten: true, cwd: './', src: [worldVisionPath + 'less/variables.less', worldVisionPath + 'less/mixins.less'], dest: distPath + 'less'},
        ]
      },
      lib: {
        files: [
          {expand: true, cwd: fontAwesomePath + 'fonts', src: '**', dest: distPath + 'fonts'},
          {expand: true, cwd: libPath + 'modernizer', src: '**', dest: distPath + 'js/'},
          {expand: true, cwd: videojsPath, src: "video-js.swf", dest: distPath + 'js/'},
          {expand: true, cwd: videojsPath + "font", src: '**', dest: distPath + 'fonts'},
          {expand: true, cwd: bootstrapPath + 'fonts', src: '**', dest: distPath + 'fonts'}
        ]
      },
      docs: {
        files: [
          {
            expand: true,
            cwd: distPath,
            src: [
                '**/*'
            ],
            dest: '../uikit-docs/assets/<%= pkg.name %>'
          }
        ]

      }
    },

    compress: {
      zip: {
        options: {
          mode: 'zip',
          archive: '<%= pkg.name %>-<%= pkg.version %>.zip',
          pretty: true
        },
        files: [
          {expand:true, cwd: distPath, src: '**/*', dest: 'wvus.uikit/'}
        ]
      }
    },

    clean: {
      jquery: {
        files: [
          {
            src: [jqueryPath + 'src/**'],
          },
        ]
      },
      datepicker: {
        files: [
          {src: [datepickerPath + 'docs', datepickerPath + 'tests']}
        ]
      }
    },

    replace: {
      version: {
        src: [ distPath + 'js/jquery-custom.js'],
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

  grunt.registerTask('dist-css', ['comments', 'less', 'autoprefixer', 'csscomb', 'usebanner']);
  grunt.registerTask('dist-js', ['concat', 'replace', 'uglify']);

  // TODO: add tests to this task when implemented
  grunt.registerTask('dist', ['dist-css', 'dist-js', 'copy', 'compress']);


  // Default task. Compile, concatenate, min, and build zip
  //grunt.registerTask('default', ['compile', 'copy:variables', 'jshint', 'copy:zipsrc', 'compress', 'clean:dist']);

  //compiles less for errors, runs js thorugh
  //grunt.registerTask('test', ['compile', 'csslint' ,'jshint', 'qunit']);

  // Compiles and concatenates js and less, then copies jquery, the js and css to the docs and to the tests
  grunt.registerTask('compile', ['concat', 'replace', 'less:dist', 'less:distResponsive', 'csscomb', 'less:minify', 'uglify','copy:docs', 'copy:tests']);

};
