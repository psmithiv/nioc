//wire up module
exports = module.exports = init;

/**
 * NIoc - IOC Container/Dependency Injection for Node.js
 *
 * @class
 */
function init(beansDefinitionURL) {
    //dependencies
    var path = require('path');

    /**
     * @private
     * @type {NIoc}
     */
    var me = this;

    /**
     * @public
     * @type {Object}
     */
    me.beans = {};

    /**
     * @constructor
     */
    (function constructor() {
        console.log('DEBUG: NIoc.constructor');

        beansDefinitionURL = beansDefinitionURL ? beansDefinitionURL : './beans.json';

        console.log('DEBUG: Loading bean definitions  -  path: ' + beansDefinitionURL);
        var beansURLs = require(path.resolve(beansDefinitionURL));

        var len = beansURLs.length;
        for(var i=0; i<len; i++) {
            console.log('DEBUG: Instantiating bean  -  id: ' + beansURLs[i].id + '  -  path: ' + beansURLs[i].path + '  -  config: ' + beansURLs[i].config);

            var c = require(path.resolve(beansURLs[i].path));
            var props = beansURLs[i].config ? beansURLs[i].config : null;
            me.beans[beansURLs[i].id] = new c(props);
        }
    })();
}

/**
 * @global
 * @param {String} id The id of the bean to return
 * @param {String} property (optional) The property on the associated bean to return
 * @returns {*}
 */
global.inject = function(id, property) {
    if(property) {
        console.log('DEBUG: Injecting bean property  -  id: ' + id + '  -  property: ' + property);
        return this.beans[id][property];
    } else {
        console.log('DEBUG: Injecting bean  -  id: ' + id);
        return this.beans[id];
    }
}