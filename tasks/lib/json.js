/**
 * Created by Administrator on 2015/1/6.
 */
var format = require('util').format;
var util = require("./util");
var ast = require("cmd-util").ast;
exports.init = function(grunt){
    var jsonConverter = function(file,options){
        var fileData = grunt.file.read(file.src);
        var id = util.generateId(file.src,options.base);
        var data = json2js(fileData, id);
        data = ast.getAst(data).print_to_string(options.uglify);
        grunt.file.write(file.dest + ".js",data);
    };
    function json2js(code, id) {
        var tpl = 'define("%s",[],%s);';
        code = format(tpl, id, code);
        return code;
    }
    return {
        jsonConverter : jsonConverter,
        json2js : json2js
    };
};
