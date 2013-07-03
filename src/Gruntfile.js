 /*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: { //core
        src: [// Bootstrap
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
        dest: '../js/<%= pkg.name %>.core.js'
      },
      distExtra: {
        src: [],
        dest: '../js/<%= pkg.name %>.extra.js'
      },
      distAll: {
        src: [// Core (Bootstrap)
        	  '<%= concat.dist.dest %>',
        	  // Extra (FuelUX)
        	  '<%= concat.distExtra.dest %>'],
        dest: '../js/<%= pkg.name %>.all.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '../js/<%= pkg.name %>.core.min.js'
      },
      distExtra: {
        src: '<%= concat.distExtra.dest %>',
        dest: '../js/<%= pkg.name %>.extra.min.js'
      },
      distAll: {
        src: '<%= concat.distAll.dest %>',
        dest: '../js/<%= pkg.name %>.all.min.js'
      },
      distJquery: {
        src: 'lib/jquery/jquery.js',
        dest: '../js/jquery.min.js'
      }           
    },

    jshint: {
      options: {
        curly: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dist: {
        src: '<%= concat.dist.dest %>'
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    
    recess: {
      // Core(Bootstrap)
      dist: {
        options: {
          compile: true
        },
        src: 'lib/worldvision/less/core.less',
        dest: '../css/<%= pkg.name %>.core.css'
      },
      distResponsive: {
        options:{
          compile: true
        },
        src: 'lib/worldvision/less/core.responsive.less',
        dest: '../css/<%= pkg.name %>.core.responsive.css'
      },
      //Core Minified
      distMin: {
        options: {
          compress: true
        },
        src: '<%= recess.dist.dest %>',
        dest: '../css/<%= pkg.name %>.core.min.css'
      },
      //Core Responsive Minified
      distResponsiveMin: {
        options: {
          compress: true
        },
        src: '<%= recess.distResponsive.dest %>',
        dest: '../css/<%= pkg.name %>.core.responsive.min.css'
      },
      // Extra (FuelUX, etc.)
      distExtra: {
        options: {
          compile: true
        },
        src: 'lib/worldvision/less/extra.less',
        dest: '../css/<%= pkg.name %>.extra.css'
      },
      distExtraResponsive: {
        options:{
          compile: true
        },
        src: 'lib/worldvision/less/extra.responsive.less',
        dest: '../css/<%= pkg.name %>.extra.responsive.css'
      },
      distExtraMin: {
        options: {
          compress: true
        },
        src: '<%= recess.distExtra.dest %>',
        dest: '../css/<%= pkg.name %>.extra.min.css'
      },
      distExtraResponsiveMin: {
        options: {
          compress: true
        },
        src: '<%= recess.distExtraResponsive.dest %>',
        dest: '../css/<%= pkg.name %>.extra.responsive.min.css'
      },
      // All
       distAll: {
        options: {
          compile: true
        },
        src: 'lib/worldvision/less/all.less',
        dest: '../css/<%= pkg.name %>.all.css'
      },
      distAllResponsive: {
        options:{
          compile: true
        },
        src: 'lib/worldvision/less/all.responsive.less',
        dest: '../css/<%= pkg.name %>.all.responsive.css'
      },
      distAllMin: {
        options: {
          compress: true
        },
        src: '<%= recess.distAll.dest %>',
        dest: '../css/<%= pkg.name %>.all.min.css'
      },
      distAllResponsiveMin: {
        options: {
          compress: true
        },
        src: '<%= recess.distAllResponsive.dest %>',
        dest: '../css/<%= pkg.name %>.all.responsive.min.css'
      },              
    },
    copy: {
      images: {
        files: [
          {expand:true, cwd:'lib/bootstrap/img', src: '*', dest: '../img', filter: 'isFile'},
          {expand:true, cwd:'lib/worldvision/img', src: '**/*', dest: '../img'}
        ]
      },
      zipsrc: {
        files: [
          {expand:true, cwd:'../', src:['**/*', '!src/**'], dest:'../<%= pkg.name %>'}
        ]
      }
    },
    compress: {
      zip: {
        options: {
          mode: 'zip',
          archive: '../<%= pkg.name %>.zip'
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

  //grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify', 'recess', 'copy', 'compress', 'clean']); //all
  grunt.registerTask('update', ['shell']); //Update libs
  grunt.registerTask('compile', ['concat', 'uglify', 'recess']); 

};
