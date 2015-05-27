module.exports = function(grunt) {
  grunt.initConfig({
    react: {
      test: {
        files: {
          'test/js/specs.js': 'test/jsx/specs.jsx'
        }
      }
    },
    browserify: {
      release: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'release/eventful-react.js': 'lib/eventful-react.js'
        }
      },
      demo: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'demo/vanilla/script.js': 'demo/vanilla/script.jsx',
          'demo/eventful/script.js': 'demo/eventful/script.jsx'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/js/specs.js']
      }
    },
    watch: {
      test: {
        files: ['test/jsx/**/*','lib/**/*'],
        tasks: ['react:test','mochaTest:test']
      },
      demo: {
        files: ['demo/**/*.jsx'],
        tasks: ['browserify:demo']
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('test',['react:test','mochaTest:test']);
  grunt.registerTask('test:watch',['watch:test']);
  grunt.registerTask('demo',['browserify:demo']);
  grunt.registerTask('demo:watch',['watch:demo']);
  grunt.registerTask('release',['browserify:release']);
};
