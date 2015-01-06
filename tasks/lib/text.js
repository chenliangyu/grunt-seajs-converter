/**
 * Created by Administrator on 2015/1/6.
 */
var format = require('util').format;
var util = require("./util");
var ast = require("cmd-util").ast;
exports.init = function(grunt){
    var htmlConverter = function(file,options){
        var fileData = grunt.file.read(file.src);
        var id = util.generateId(file.src,options.base);
        var data = html2js(fileData, id);
        data = ast.getAst(data).print_to_string(options.uglify);
        grunt.file.write(file.dest + ".js",data);
    };
    function html2js(code, id) {
        var tpl = 'define("%s",[],"%s");';
        code = code.split(/\r\n|\r|\n/).map(function(line) {
            return line.replace(/\\/g, '\\\\');
        }).join('\n');
        code = format(tpl, id, code.replace(/\"/g, '\\\"'));
        return code;
    }
    return {
        htmlConverter : htmlConverter,
        html2js : html2js
    };
};
