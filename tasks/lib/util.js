/**
 * Created by Administrator on 2015/1/6.
 */
var path = require("path");
exports.unixy = function(uri) {
    return uri.replace(/\\/g, '/');
};
exports.generateId  = function(fileSrc,base){
    return this.unixy( path.relative(base || '',fileSrc).replace(/\.js$/, ''));
};
