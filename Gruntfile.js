/*
 * grunt-seajs-converter
 * https://github.com/chenliangyu/grunt-seajs-converter
 *
 * Copyright (c) 2015 chenliangyu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      example: ['tmp'],
      test : ['test/tmp']
    },
    // Configuration to be run (and then tested).
   seajs_converter:{
        config : {
            options:{
                base : "example/lib"
            },
            src : "example/lib/config.js",
            dest : "tmp/lib/config.js"
        },
        other : {
            options : {
                base : "example"
            },
            files:[{
                expand : true,
                cwd : "example/js",
                src : "**/*.js",
                dest : "tmp/js"
            }]
        }
   },
    // Unit tests.
    "jasmine_node": {
      all: ['test/']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean:example', 'seajs_converter','jasmine_node',"clean:test"]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
