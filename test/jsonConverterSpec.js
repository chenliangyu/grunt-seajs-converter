/**
 * Created by Administrator on 2015/1/6.
 */
var grunt = require("grunt");
var htmlConverter = require("../tasks/lib/text").init(grunt);
describe("Test JSON Converter",function(){
    it("should convert JSON to cmd module",function(){
        var code = JSON.stringify({test:"test",value:1,number:2.2});
        var e = 'define("test",[],"{\\\"test\\\":\\\"test\\\",\\\"value\\\":1,\\\"number\\\":2.2}");';
        expect(htmlConverter.html2js(code,"test")).toEqual(e);
    });
    it("should convert JSON file to cmd module",function(){
        var src = "test/fixture/no-modifier.json";
        var dest = "test/tmp/no-modifier.json";
        var output = htmlConverter.htmlConverter({
            src : src,
            dest : dest
        },{});
        expect(grunt.file.read(dest+".js")).toEqual(grunt.file.read("test/expect/no-modifier.json.js"));
    })
});