 /*global module:false*/
 /* jshint node:true */
 module.exports = function(grunt) {
  "use strict";
  // Path variables
  var uikitConfig = {
   srcPath: './',
   libPath: '<%= uikit.srcPath %>lib/',
   distPath: '<%= uikit.srcPath %>dist/',
   docsPath: '<%= uikit.srcPath %>docs/',
   bootstrapPath: '<%= uikit.libPath %>bootstrap/',
   bootstrapLessPath:  '<%= uikit.bootstrapPath %>less/',
   bootstrapJsPath:  '<%= uikit.bootstrapPath %>js/',
   bootstrapSelectPath:  '<%= uikit.libPath %>bootstrap-select/js/',
   fontAwesomePath:  '<%= uikit.libPath %>font-awesome/',
   jqueryPath:  '<%= uikit.libPath %>jquery/dist/',
   datepickerPath:  '<%= uikit.libPath %>bootstrap-datepicker/',
   worldVisionPath: '<%= uikit.libPath %>worldvision/',
 };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n',
    uikit: uikitConfig,
    /*
    Concat JS
    */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      uikit: {
        src: [
        '<%= uikit.worldVisionPath %>js/namespace.js',
        '<%= uikit.bootstrapJsPath %>transition.js',
        '<%= uikit.bootstrapJsPath %>alert.js',
        '<%= uikit.bootstrapJsPath %>button.js',
        '<%= uikit.bootstrapJsPath %>carousel.js',
        '<%= uikit.bootstrapJsPath %>collapse.js',
        '<%= uikit.bootstrapJsPath %>dropdown.js',
        '<%= uikit.bootstrapJsPath %>modal.js',
        '<%= uikit.bootstrapJsPath %>tooltip.js',
        '<%= uikit.bootstrapJsPath %>popover.js',
        '<%= uikit.bootstrapJsPath %>scrollspy.js',
        '<%= uikit.bootstrapJsPath %>tab.js',
        '<%= uikit.bootstrapJsPath %>affix.js',
        '<%= uikit.datepickerPath %>js/bootstrap-datepicker.js',
        '<%= uikit.bootstrapSelectPath %>bootstrap-select.js'
        ],

        dest: '<%= uikit.distPath %>js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      jquery: {
        src: '<%= uikit.jqueryPath %>jquery.js',
        dest: '<%= uikit.distPath %>js/jquery.min.js'
      },
      uikit: {
        src: '<%= concat.uikit.dest %>',
        dest: '<%= uikit.distPath %>js/<%= pkg.name %>.min.js'
      },

    },

    jshint: {
      options: {
        jshintrc: '<%= uikit.worldVisionPath %>js/.jshintrc'
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
      },
      docs: {
        options: {
          spawn: false,
          livereload: '<%= connect.docs.options.livereload %>'
        },
        files: ['<%= uikit.docsPath %>assets/**/*', '<%= uikit.docsPath %>elements/**/*', '<%= uikit.docsPath %>develop/**/*', '<%= uikit.docsPath %>design/**/*', '<%= uikit.docsPath %>_includes/**/*', '<%= uikit.docsPath %>_layouts/**/*', '<%= uikit.docsPath %>tests/**/*'],
        tasks: ['less:docs', 'jekyll']
      }
    },

    jekyll : {
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

    comments: {
      lib: {
        options: {
          singleline: false,
          multiline: true
        },
        src: ['<%= uikit.bootstrapLessPath %>*.less',
        '<%= uikit.fontAwesomePath %>less/*.less',
        '<%= uikit.datepickerPath %>less/datepicker3.less',
        '<%= uikit.bootstrapSelectPath %>bootstrap-select.css',
        '<%= uikit.worldVisionPath %>less/video-js-skin.less']
      }
    },

    less: {
      precompile: {
        src: '<%= uikit.worldVisionPath %>less/precompile.less',
        dest: '<%= uikit.worldVisionPath %>css/precompile.css'
      },
      dist: {
        src: '<%= uikit.worldVisionPath %>less/namespace.less',
        dest: '<%= uikit.distPath %>css/<%= pkg.name %>.css'
      },
      docs: {
        src: ['<%= uikit.docsPath %>assets/less/docs.less'],
        dest: '<%= uikit.docsPath %>assets/css/docs.css'
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: [
        {src: ['<%= less.dist.dest %>'], dest: '<%= uikit.distPath %>css/<%= pkg.name %>.min.css'},
        ]
      }
    },

    csslint: {
      lib: {
        options: {
          csslintrc: '<%= uikit.worldVisionPath %>less/.csslintrc',
          formatters: [
          {id: 'text', dest: 'csslint-lib.txt'}
          ],
        },
        src: ['<%= less.dist.dest %>']
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9', 'android 4.2' ]
      },
      dist: {
        src: '<%= less.dist.dest %>'
      },
    },

    csscomb: {
      options: {
        config: '<%= uikit.worldVisionPath %>less/.csscomb.json'
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
          '<%= uikit.distPath %>css/<%= pkg.name %>.min.css'
          ]
        }
      }
    },

    copy: {
      images: {
        files: [
        {expand: true, cwd: '<%= uikit.worldVisionPath %>img', src: '**/*', dest: '<%= uikit.distPath %>img'}
        ]
      },
      variables: {
        files: [
        {expand:true, flatten: true, cwd: '<%= uikit.srcPath %>', src: ['<%= uikit.worldVisionPath %>less/variables.less', '<%= uikit.worldVisionPath %>less/mixins.less'], dest: '<%= uikit.distPath %>less'},
        {expand: true, cwd: '<%= uikit.worldVisionPath %>less/mixins', src: '**', dest: '<%= uikit.distPath %>less/mixins/'}
        ]
      },
      lib: {
        files: [
        {expand: true, cwd: '<%= uikit.fontAwesomePath %>fonts', src: '**', dest: '<%= uikit.distPath %>fonts'},
        {expand: true, cwd: '<%= uikit.jqueryPath %>', src: 'jquery.js', dest: '<%= uikit.distPath %>js/'},
        {expand: true, cwd: '<%= uikit.bootstrapPath %>fonts', src: '**', dest: '<%= uikit.distPath %>fonts'}
        ]
      },
      docs: {
        files: [
        {expand: true, cwd: '<%= uikit.distPath %>', src: '**/*', dest: '<%= uikit.docsPath %>/assets/wvus.uikit'},
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
        {expand:true, cwd: '<%= uikit.distPath %>', src: '**/*', dest: '<%= uikit.srcPath %>'}
        ]
      }
    },

    clean: {
      precompile: {
        files: [{src: ['<%= uikit.worldVisionPath %>css/**']}]
      },
      jquery: {
        files: [
        {
          src: ['<%= uikit.jqueryPath %>src/**'],
        },
        ]
      },
      datepicker: {
        files: [
        {src: ['<%= uikit.datepickerPath %>docs', '<%= uikit.datepickerPath %>tests']}
        ]
      },
      docs: {
        files: [
        {src: ['_site']}
        ]
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
        src: '<%= docsPath %>_site/**/*.html'
      }
    },

    replace: {
      version: {
        src: ['<%= uikit.distPath %>js/<%= pkg.name %>.js'],
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
  require('time-grunt')(grunt);

  grunt.registerTask('dist-css', ['comments', 'less:precompile', 'less:dist', 'less:minify', 'autoprefixer', 'csscomb', 'usebanner', 'clean:precompile']);
  grunt.registerTask('dist-js', ['concat', 'replace', 'uglify']);

  // TODO: add tests to this task when implemented
  grunt.registerTask('dist', ['dist-css', 'dist-js', 'copy', 'compress']);
  grunt.registerTask('default', ['dist']);

  // Docs
  grunt.registerTask('docs-build', ['dist', 'clean:docs', 'less:docs', 'jekyll']);
  grunt.registerTask('serve', ['docs-build', 'connect', 'watch'] );

  grunt.registerTask('test', []);

  //compiles less for errors, runs js thorugh
  //grunt.registerTask('test', ['compile', 'csslint' ,'jshint', 'qunit']);
};
