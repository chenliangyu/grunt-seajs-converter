/**
 * Created by Administrator on 2015/1/6.
 */
var grunt = require("grunt");
var htmlConverter = require("../tasks/lib/text").init(grunt);
describe("Test Html Converter",function(){
    it("should convert html to cmd module",function(){
        var code = '<script src="http://code.jquery.com/jquery.min.js"></script><div class="a"><a href="http://www.baidu.com/?keyword=something">搜索</a></div>';
        var e = 'define("test",[],"<script src=\\"http://code.jquery.com/jquery.min.js\\"></script><div class=\\"a\\"><a href=\\"http://www.baidu.com/?keyword=something\\">搜索</a></div>");';
        expect(htmlConverter.html2js(code,"test")).toEqual(e);
    });
    it("should convert html file to cmd module",function(){
        var src = "test/fixture/no-modifier.html";
        var dest = "test/tmp/no-modifier.html";
        var output = htmlConverter.htmlConverter({
            src : src,
            dest : dest
        },{});
        expect(grunt.file.read(dest+".js")).toEqual(grunt.file.read("test/expect/no-modifier.html.js"));
    })
});