//wire up module
exports = module.exports = init;

/**
 * NIoc - IOC Container/Dependency Injection for Node.js
 *
 * @class
 */
function init(beanDefinitionsURL) {
    //dependencies
    var path = require('path');

    /**
     * @private
     * @type {*}
     */
    var me = this;

    /**
     * @private
     */
    var beanDefinitions = {};

    /**
     * @private
     * @type {Object}
     */
    var beans = {};

    /**
     * @constructor
     */
    function constructor() {
        console.log('DEBUG: NIoc.constructor');

        beanDefinitionsURL = beanDefinitionsURL ? beanDefinitionsURL : './beans.json';

        console.log('DEBUG: Loading bean definitions  -  path: ' + beanDefinitionsURL);
        beanDefinitions = require(path.resolve(beanDefinitionsURL));

        //create beans
        for(var beanId in beanDefinitions) {
            if(!beans[beanId]) {
                me.createBean(beanId, beanDefinitions[beanId]);
            }
        }

        //register self as bean
        beans['nioc'] = me;
    };

    /**
     * @public
     * @param {String} id
     * @param {Object} beanDefinition
     * @returns {c}
     */
    me.createBean = function(id, beanDefinition) {
        if(!beanDefinitions[id])
            throw new Error('Bean id ' + id + 'does not exist in bean definitions');

        console.log('DEBUG: Instantiating bean  -  beanId: ' + id + '  -  path: ' + beanDefinition.path + '  -  config: ' + beanDefinition.config);

        var c = require(path.resolve(beanDefinition.path));
        var props = beanDefinition.config ? beanDefinition.config : null;
        var bean = new c(props);
        bean.$id = id;

        if(beanDefinition.postConstruct) {
            var pcLen = beanDefinition.postConstruct.length;

            for(var j=0; j<pcLen; j++) {
                performPostConstructMethodCall(bean, beanDefinition.postConstruct[j])
            }
        }

        beans[id] = bean;
        return bean;
    };

    /**
     * @public
     * @param {String} id
     */
    me.destroyBean = function(id) {
        delete beans[id];
    };

    /**
     * @private
     * @param bean
     * @param postConstructDefinition
     */
    function performPostConstructMethodCall(bean, postConstructDefinition) {
        console.log('DEBUG: Performing post construction method call  -  beanId: ' + bean.$id + '  -  method: ' + postConstructDefinition.method + '  -  arguments: ' + postConstructDefinition.arguments);
        bean[postConstructDefinition.method].apply(bean, postConstructDefinition.arguments)
    }

    /**
     * @global
     * @param {String} id The id of the bean to return
     * @param {String} property (optional) The property on the associated bean to return
     * @returns {*}
     */
    global.inject = function(id, property) {
        //check for bean -  if no instance exists, create
        if(!beans[id]) {
            me.createBean(id, beanDefinitions[id]);
        }

        if(property) {
            console.log('DEBUG: Injecting bean property  -  id: ' + id + '  -  property: ' + property);
            return beans[id][property];
        } else {
            console.log('DEBUG: Injecting bean  -  id: ' + id);
            return beans[id];
        }
    }

    //construct object
    constructor();
}