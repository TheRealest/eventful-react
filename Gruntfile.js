module.exports = function(grunt) {
  grunt.initConfig({
    react: {
      test: {
        files: {
          'test/js/specs.js': 'test/jsx/specs.jsx'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'nyan', 
        },
        src: ['test/js/specs.js']
      }
    },
    watch: {
      test: {
        files: ['test/jsx/**/*','lib/**/*'],
        tasks: ['react:test','mochaTest:test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
};