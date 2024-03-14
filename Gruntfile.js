module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // SASS compilation
      sass: {
        dist: {
          files: {
            'dist/css/styles.css': 'src/scss/styles.scss'
          }
        }
      },
  
      // Watch for changes
      watch: {
        sass: {
          files: ['src/scss/**/*.scss'],
          tasks: ['sass'],
        },
        js: {
          files: ['src/js/**/*.js'],
          tasks: ['uglify'],
        }
      },
  
      // JS minification
      uglify: {
        my_target: {
          files: {
            'dist/js/script.min.js': ['src/js/**/*.js']
          }
        }
      }
    });
  
    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  
    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify', 'watch']);
  };
  