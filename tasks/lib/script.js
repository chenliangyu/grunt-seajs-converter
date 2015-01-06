/**
 * Created by Administrator on 2015/1/5.
 */

var cmdUtil = require("cmd-util");
var ast = cmdUtil.ast;
var idUrl = cmdUtil.iduri;
var path = require("path");
var util = require("./util");
exports.init = function(grunt){
    var jsConverter = function(file,options){
        var fileData = grunt.file.read(file.src);
        var astCache;
        try{
            astCache = ast.getAst(fileData);
        }catch(e){
            grunt.log.error('js parse error ' + file.src.red);
            grunt.fail.fatal(e.message + ' [ line:' + e.line + ', col:' + e.col + ', pos:' + e.pos + ' ]');
        }
        var meta = ast.parseFirst(astCache);
        if (!meta) {
            grunt.log.writeln('found non cmd module "' + file.src + '"');
            // do nothing
            return fileData;
        }
        if(meta.id){
            grunt.log.verbose.writeln("found module id " + meta.id + " in module "+file.src);
        }
        var id = meta.id || util.generateId(file.src,options.base);
        var idModifier = options.modifiers && options.modifiers.id;
        var dependencyModifier = options.modifiers && options.modifiers.dependency;
        var requireModifier = options.modifiers && options.modifiers.require;
        var asyncModifier = options.modifiers && options.modifiers.async;
        var o = {
            id : modifyId(id,idModifier)
        };
        o.dependencies =  dependencyModifier ? refactorModifier(dependencyModifier) : meta.dependencies;
        o.require = requireModifier ?  refactorModifier(requireModifier) :undefined;
        o.async = asyncModifier ? refactorModifier(asyncModifier) : undefined;
        astCache = ast.modify(astCache,o);
        var data = astCache.print_to_string(options.uglifyjs);
        grunt.file.write(file.dest,data);
    };
    function modifyId(id,idModifier){
        var type = grunt.util.kindOf(idModifier);
        var modifier = refactorModifier(idModifier);
        return modifier?modifier(id) : id;
    }
    function refactorModifier(modifier){
        var type = grunt.util.kindOf(modifier);
        if(type === "array"){
            return function(v){
                var modifiers = modifier.filter(function(cond){
                    if(!cond.length){
                        return false;
                    }
                    var reg = cond[0];
                    if(grunt.util.kindOf(reg) === "regexp" && reg.test(v)){
                        return true;
                    }else if(grunt.util.kindOf(reg) === "string" && reg === v){
                        return true;
                    }else{
                        return false;
                    }
                });
                if(modifiers.length===0){
                    return v;
                }else{
                    return modifiers[0][1] || "";
                }
            };
        }else if(type === "object"){
            return function(id){
                if(modifier.hasOwnProperty(id)){
                    return modifier[id];
                }else{
                    return id;
                }
            };
        }else if(type === "function"){
            return modifier;
        }else{
            return null;
        }
    }

    return {
        jsConverter : jsConverter,
        modifyId : modifyId,
        refactorModifier : refactorModifier
    };
};



