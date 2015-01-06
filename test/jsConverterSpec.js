/**
 * Created by Administrator on 2015/1/5.
 */
var grunt = require("grunt");
var jsConverter = require("../tasks/lib/script").init(grunt)
var util = require("../tasks/lib/util");
describe("Test Javascript Converter",function(){
    it("should converter '\\' to '/'",function(){
        var url = "e:\\a\\b\\c";
        var afterConverter = util.unixy(url);
        expect(afterConverter).toEqual("e:/a/b/c");
    });
    it("should generate an id for file",function(){
        var fileSrc = "test/expect/a.js";
        var base = "test";
        expect(util.generateId(fileSrc,base)).toEqual("expect/a");
        base = "./"
        expect(util.generateId(fileSrc,base)).toEqual("test/expect/a");
    });
    it("should modify id via idModifier",function(){
        var id = "a";
        var idModifier = function(v){
            if(v === "a"){
                return "function-idModifier";
            }else{
                return v;
            }
        }
        expect(jsConverter.modifyId(id,idModifier)).toEqual("function-idModifier");
        idModifier = {
            a : "object-idModifier"
        }
        expect(jsConverter.modifyId(id,idModifier)).toEqual("object-idModifier");
        id = "b";
        expect(jsConverter.modifyId(id,idModifier)).toEqual("b");

        id = "moduleA"
        idModifier = [[/A$/,"array-idModifier"]];
        expect(jsConverter.modifyId(id,idModifier)).toEqual("array-idModifier");

        id = "Amodule"
        expect(jsConverter.modifyId(id,idModifier)).toEqual("Amodule");
    });
    it("should refactor modifier",function(){
        var dep = "a";
        var depB = "b";
        var depsModifier = function(v){
            if(v === "a"){
                return "function-modifier"
            }else{
                return v;
            }
        }
        expect(jsConverter.refactorModifier(depsModifier)(dep)).toEqual("function-modifier");
        expect(jsConverter.refactorModifier(depsModifier)(depB)).toEqual("b");
        depsModifier = {
            "a" : "object-modifier"
        }
        expect(jsConverter.refactorModifier(depsModifier)(dep)).toEqual("object-modifier");
        expect(jsConverter.refactorModifier(depsModifier)(depB)).toEqual("b");

        dep = "moduleA";
        depsModifier = [[/A$/,"array-modifier"]];
        expect(jsConverter.refactorModifier(depsModifier)(dep)).toEqual("array-modifier");
        expect(jsConverter.refactorModifier(depsModifier)(depB)).toEqual("b");
    });
    it("should converter javascript to cmd module when has modifier",function(){
        var src = "test/fixture/a.js";
        var dest = "test/tmp/no-modifier.js";
        var output = jsConverter.jsConverter({
            src : src,
            dest : dest
        },{
            modifiers : {
                id : {
                    "test/fixture/a" : "test/expect/a"
                },
                require : function(v){
                    if(v === "jquery"){
                        return "$";
                    }else{
                        return v;
                    }
                },
                dependency : {
                    "a" : "test/fixture/a"
                }
            }
        });
        expect(grunt.file.read(dest)).toEqual(grunt.file.read("test/expect/a.js"));
    });
    it("should converter javascript to cmd module when no modifier",function(){
        var src = "test/fixture/no-modifier.js";
        var dest = "test/tmp/no-modifier.js";
        jsConverter.jsConverter({
            src : src,
            dest : dest
        },{});
        expect(grunt.file.read(dest)).toEqual(grunt.file.read("test/expect/no-modifier.js"));
    });
})