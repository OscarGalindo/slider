module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      source: {
        src: 'src/slider.js',
        dest: 'gen/slider.js'
      }
    },

    ngtemplates: {
      app: {
        options: {
          module: 'slider',
          prefix: 'templates/slider',
          htmlmin:  {
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          }
        },
        cwd: 'src',
        src: '<%= pkg.name %>.html',
        dest: 'gen/<%= pkg.name %>.tpl.js'
      }
    },

    concat: {
      dist: {
        src: ['gen/slider.js', 'gen/slider.tpl.js'],
        dest: 'dist/slider.js'
      }
    },

    uglify: {
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files: {
          'dist/<%= pkg.name %>.min.css' : 'src/<%= pkg.name %>.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['copy', 'ngtemplates', 'concat', 'uglify', 'sass']);

};