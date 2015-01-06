/**
 * Created by Administrator on 2015/1/4.
 */
define(function(require){
    require("jquery");
    var index = require("./page/index/index");
    return function(){
        $("body").append("<div>main method 启动了</div>");
        index.render();
    }
});