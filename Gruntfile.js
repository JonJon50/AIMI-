module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Dart SASS compilation
    "dart-sass": {
      dist: {
        files: {
          "dist/css/styles.css": "src/scss/styles.scss",
        },
      },
    },
    
    // Task to copy HTML
    copy: {
      html: {
        src: "src/index.html",
        dest: "dist/index.html",
      },
    },
    
    // Watch for changes
    watch: {
      sass: {
        files: ["src/scss/**/*.scss"],
        tasks: ["dart-sass", "copy:html"], // Added copying HTML task here
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify"],
      },
      html: {
        files: ["src/index.html"],
        tasks: ["copy:html"],
      },
    },

    // JS minification
    uglify: {
      my_target: {
        files: {
          "dist/js/script.min.js": ["src/js/**/*.js"],
        },
      },
    },
    
    // Connect: Serve files
    connect: {
      server: {
        options: {
          port: 5500,
          base: 'dist', // Change this to your build directory
          livereload: true,
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(function (req, res, next) {
              if (req.url.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
              }
              return next();
            });
            return middlewares;
          },
        },
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-dart-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-connect");

  // Default task(s)
  grunt.registerTask("default", ["dart-sass", "uglify", "copy", "watch"]);
  grunt.registerTask("serve", ["connect", "watch"]);
};


