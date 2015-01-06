# grunt-seajs-converter

> convert seajs module to cmd

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-seajs-converter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-seajs-converter');
```

## The "seajs_converter" task

### Overview
In your project's Gruntfile, add a section named `seajs_converter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  seajs_converter: {
    options: {
      // Task-specific options go here.
      base:""//for generate id
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
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.converters
编写自定义转换函数。与文件的后缀名对应，每个后缀名可以对应一个数组。
#### options.handlebars
与handlebars相关的配置，其中id为handlebars runtime lib的地址，可以是cdn地址也可以是项目中的alias名.
其余配置均与handlebars的precompile的配置相同
#### options.uglifyjs
与uglifyjs的输出配置相同,用于转换成功后输出结果
#### options.modifiers
在输出id,deps,require,require.async等地址时可以转换其地址。共三种模式:

```js
 seajs_converter:{
    modifier:{
        id : {
            "targetId" : "idafterchange"
        }
    }
 }
 ```
 ```js
 seajs_converter:{
     modifier:{
         id : function(targetId){
               return "idafterchange"
         }
     }
  }
  ```
  如果是函数，这一定需要返回值，其中，dependency定义为函数时返回null则代表删除该dependency；
   ```js
 seajs_converter:{
     modifier:{
         id :[[/regexpfortesttargetId/,idafterChange]]
     }
  }
```
  以上三种模式当用于dependency时，这代表的是dependencies数组中的每一个单独的dependency；
  以下是具体示例。
```js
grunt.initConfig({
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
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
