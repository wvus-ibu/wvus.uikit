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
        stripBanners: false
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
            'lib/bootstrap/js/bootstrap-affix.js'],
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
        tasks: ['recess', 'copy:docs']
      },
      docs: {
        files: ['../docs/**.*'],
        tasks: ['jekyll:build']
      }
    },
    /*
    Compile and Minify less
     */
    recess: {
      // All
       dist: {
        options: {
          compile: true
        },
        src: 'lib/worldvision/less/wvus.uikit.less',
        dest: '../css/<%= pkg.name %>.css'
      },
      distResponsive: {
        options:{
          compile: true
        },
        src: 'lib/worldvision/less/wvus.uikit.responsive.less',
        dest: '../css/<%= pkg.name %>.responsive.css'
      },
      distMin: {
        options: {
          compress: true
        },
        src: '<%= recess.dist.dest %>',
        dest: '../css/<%= pkg.name %>.min.css'
      },
      distResponsiveMin: {
        options: {
          compress: true
        },
        src: '<%= recess.distResponsive.dest %>',
        dest: '../css/<%= pkg.name %>.responsive.min.css'
      },
    },
    copy: {
      images: {
        files: [
          {expand:true, cwd:'lib/font-awesome/font', src: '*', dest: '../font'},
          {expand:true, cwd:'lib/worldvision/img', src: '**/*', dest: '../img'}
        ]
      },
      zipsrc: {
        files: [
          {expand:true, cwd:'../', src:['Contribute.md','css/**', 'font/**', 'img/**', 'js/**', 'README.md', 'ReleaseNotes.md'], dest:'../<%= pkg.name %>'}
        ]
      },
      //copies js & css to docs
      //TODO: add to docs images
      docs: {
        files: [
          {expand:true, cwd: '../css', src: '*', dest: '../docs/assets/css'},
          {expand:true, cwd: '../js', src: ['jquery.min.js', 'wvus.uikit.*'], dest: '../docs/assets/js'},
          {expand:true, cwd: 'lib/font-awesome/font', src: '*', dest: '../docs/assets/font'},
          {expand:true, cwd: 'lib/worldvision/img/ico', src: '*', dest: '../docs/assets/ico'},
          {expand:true, cwd:'lib/worldvision/img', src: '*', dest: '../docs/assets/img'},
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
      options: {force:true},
      src:'../<%= pkg.name %>'
    },
    shell: {
      script: {
        command: 'sh update-libs.sh',
        options: {
          stdout: true
        }
      }
    },
    jekyll: {
      options: {
          src: '../docs',
          dest: '../docs/_site',
          config: '../docs/_config.yml'
      },
      build: {},
      serve:{
        options: {
          baseurl: 'http://localhost:4000',
          serve: true,
          watch: true
        }
      }
    },
    validation: {
      options: {
        reset: true
      },
      files: {
        src: ['../docs/_site/**/*.html']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task. Compile, concatenate, min, and build zip
  grunt.registerTask('default', ['concat', 'uglify', 'recess', 'copy:docs', 'copy:images', 'copy:tests', 'test','copy:zipsrc', 'compress', 'clean']);

  // Updates Bootstrap, jQuery, and Font Awesome via volo
  grunt.registerTask('update', ['shell']);

  // Compiles and concatenates js and less, then copies jquery, the js and css to the docs and to the tests
  grunt.registerTask('compile', ['concat', 'recess', 'copy:docs', 'copy:tests']);

  //Lints each js plugin, builds/validates docs
  grunt.registerTask('test', ['recess', 'jshint', 'qunit', 'jekyll:build', 'validation']); //TODO: run qunit tests with grunt

  // Default task. Compile, concatenate, min, and build zip
  grunt.registerTask('build', ['concat', 'uglify', 'recess', 'copy:docs', 'copy:images', 'copy:tests', 'copy:zipsrc', 'compress', 'clean']);
};