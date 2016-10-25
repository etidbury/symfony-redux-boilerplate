global.ROOT_URI = __dirname + '/app/Resources/node-server/';
global.MODEL_URI = __dirname + '/app/Resources/node-server/model/';
global.PUBLIC_URI = ROOT_URI + 'public/';
global.PRIVATE_URI = ROOT_URI + 'private/';

global.rootRequire = function (name) {
    var m = require(global.ROOT_URI + name);
    return typeof m == "function" ? m : function () {
        console.error("Failed to find root module: '",global.ROOT_URI + name, "'");
    };
};
global.srcRequire = function (name) {
    return require(global.ROOT_URI + '' + name);//in-case source directory changes
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

rootRequire('config')();

srcRequire('server.js')();
