module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    "dart-sass": {
      dist: {
        files: {
          "dist/css/styles.css": "src/scss/styles.scss",
        },
      },
    },

    copy: {
      html: {
        src: "src/index.html",
        dest: "dist/index.html",
      },
    },

    watch: {
      sass: {
        files: ["src/scss/**/*.scss"],
        tasks: ["dart-sass", "copy:html"],
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

    uglify: {
      my_target: {
        files: {
          "dist/js/script.min.js": ["src/js/**/*.js"],
        },
      },
    },

    connect: {
      server: {
        options: {
          port: 5500,
          base: "dist",
          livereload: true,
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(function (req, res, next) {
              if (req.url.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
              }
              return next();
            });
            return middlewares;
          },
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-dart-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("default", ["dart-sass", "uglify", "copy", "watch"]);
  grunt.registerTask("serve", ["connect", "watch"]);
};
