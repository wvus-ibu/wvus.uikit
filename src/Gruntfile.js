 /*global module:false*/
 /* jshint node:true */
module.exports = function(grunt) {
  "use strict";
  // Path variables
  var srcPath = '../',
      libPath = 'lib/',
      distPath = '../dist/',
      bootstrapLessPath = libPath + 'bootstrap/less/',
      bootstrapJsPath = libPath + 'bootstrap/js/',
      fontAwesomePath = libPath + 'font-awesome/less',
      jqueryPath = libPath + 'jquery/dist/',
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
        tasks: ['less', 'csslint']
      },
      js: {
        files: ['lib/worldvision/js/*.js'],
        tasks: ['qunit', 'jshint']
      }
    },

    comments: {
      bootstrap: {
        options: {
          singleline: false,
          multiline: true
        },
        src: [bootstrapLessPath + '*.less']
      },
      fontAwesome: {
        options: {
          singleline: false,
          multiline: true
        },
        src: ['lib/font-awesome/less/*.less']
      }
    },

    less: {
      dist:{
        options: {
          outputSourceFiles: true,
          sourceMap: true,
          sourceMapFilename: '../dist/css/<%= pkg.name %>.css.map',
          sourceMapRootpath: 'src',
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
        src: '<%= less.dist.dest %>',
        dest: distPath + 'css/<%= pkg.name %>.min.css'
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
      uikit: {
        src: '<%= less.dist.dest =>'
      }

    },

    csscomb: {
      options: {
        config: worldVisionPath + 'less/.csscomb.json'
      },
      dist: {
        src: '<%= less.dist.dest %>',
        dest: '<%= less.dist.dest %>'
      }
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
            distPath + 'css/wvus.uikit.css',
            distPath + 'css/wvus.uikit.min.css',
            distPath + 'css/wvus.uikit.theme.css',
            distPath + 'css/wvus.uikit.theme.min.css'
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

  grunt.registerTask('dist-css', ['comments', 'less', 'autoprefixer', 'csscomb', 'usebanner']);
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  grunt.registerTask('build', ['dist-css', 'dist-js']);

  // Default task. Compile, concatenate, min, and build zip
  //grunt.registerTask('default', ['compile', 'copy:variables', 'jshint', 'copy:zipsrc', 'compress', 'clean:dist']);

  //compiles less for errors, runs js thorugh
  //grunt.registerTask('test', ['compile', 'csslint' ,'jshint', 'qunit']);

  // Compiles and concatenates js and less, then copies jquery, the js and css to the docs and to the tests
  grunt.registerTask('compile', ['concat', 'replace', 'less:dist', 'less:distResponsive', 'csscomb', 'less:minify', 'uglify','copy:docs', 'copy:tests']);

};
