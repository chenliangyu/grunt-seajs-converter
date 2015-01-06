/*
 * grunt-seajs-converter
 * https://github.com/chenliangyu/grunt-seajs-converter
 *
 * Copyright (c) 2015 chenliangyu
 * Licensed under the MIT license.
 */

'use strict';
var path = require("path");
module.exports = function(grunt) {
    var script = require("./lib/script").init(grunt);
    var text = require("./lib/text").init(grunt);
    var json = require("./lib/json").init(grunt);
    var template = require("./lib/template").init(grunt);
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('seajs_converter', 'convert seajs module to cmd', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        converters : {
            ".js" : [script.jsConverter],
            '.html': [text.htmlConverter],
            '.json': [json.jsonConverter],
            '.tpl': [text.htmlConverter],
            '.handlebars': [template.handlerbarsConverter]
        },
        handlebars : {
            id : ""  //alias for handlebars runtime lib
            //other compile options
        },
        uglifyjs : {
            indent_start  : 0,     // start indentation on every line (only when `beautify`)
            indent_level  : 4,     // indentation level (only when `beautify`)
            quote_keys    : false, // quote all keys in object literals?
            space_colon   : true,  // add a space after colon signs?
            ascii_only    : false, // output ASCII-safe? (encodes Unicode characters as ASCII)
            inline_script : false, // escape "</script"?
            width         : 80,    // informative maximum line width (for beautified output)
            max_line_len  : 32000, // maximum line length (for non-beautified output)
            ie_proof      : true,  // output IE-safe code?
            beautify      : true, // beautify output?
            source_map    : null,  // output a source map
            bracketize    : false, // use brackets every time?
            comments      : true, // output comments?
            semicolons    : true
        },
        modifiers : {
            id : null,
            dependency : null,
            require : null,
            async : null
        }
    });
    // Iterate over all specified file groups.
    var count = 0;
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
        /**
         * if src is an array,just get the first one to converter;
         *
         * **/
        var fileSrc = src[0],
               dest = f.dest,
               extname = path.extname(fileSrc),
               converters = options.converters[extname];
        //if no converters found,just do copy
        if(!converters || !converters.length){
            grunt.file.copy(fileSrc,dest);
            grunt.log.writeln('File "' + fileSrc + '" has converted to ' + dest);
        }
        converters.forEach(function(converter){
            var data = converter({
                src : fileSrc,
                dest : dest
            },options);
            grunt.log.writeln('File "' + fileSrc + '" has converted to ' + dest);
        });
        count++;
    });
    grunt.log.writeln('convert "' + count.toString().cyan + '" files.');
  });

};
