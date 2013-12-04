//wire up module
exports = module.exports = init;

/**
 * NIoc - IOC Container/Dependency Injection for Node.js
 *
 * @class
 */
function init(beanDefinitionsURL) {
    /**
     * @private
     * @type {*}
     */
    var me = this;

    /**
     * Object containing bean definitions from loaded json file
     *
     * @private
     * @type {Object}
     */
    var beanDefinitions = {};

    /**
     * Object containing required beans
     *
     * @private
     * @type {Object}
     */
    var beans = {};

    /**
     * @constructor
     */
    function constructor() {
        console.log('DEBUG: NIoc.constructor');

        //If beanDefinitionsURL is not defined, look for beans.json one level above node_modules
        beanDefinitionsURL = beanDefinitionsURL ? beanDefinitionsURL : '../../../beans.json';

        console.log('DEBUG: Loading bean definitions  -  path: ' + beanDefinitionsURL);
        beanDefinitions = require(beanDefinitionsURL);

        //create singleton beans
        for(var beanId in beanDefinitions) {
            if(!beans[beanId] && beanDefinitions[beanId].singleton != false) {
                me.createBean(beanId, beanDefinitions[beanId]);
            }
        }

        //register self as bean
        beans['nioc'] = me;
    };

    /**
     * Creates a bean and registers it
     *
     * @public
     * @param {String} id The id of the bean to use for future injection
     * @param {Object} beanDefinition The bean definition used to create the bean
     * @returns {Object} The created/registered bean
     */
    me.createBean = function(id, beanDefinition) {
        console.log('DEBUG: Creating bean  -  id: ' + id + '  -  path: ' + beanDefinition.path + '  -  config: ' + beanDefinition.config);

        //load bean
        var bean = require(beanDefinition.path);
        bean = new bean(beanDefinition.config);

        //tack id onto bean for internal use
        bean.$id = id;

        //if bean definition contains postConstruct object, call post construct methods
        if(beanDefinition.postConstruct) {
            var len = beanDefinition.postConstruct.length;

            for(var i=0; i<len; i++) {
                performPostConstructMethodCall(bean, beanDefinition.postConstruct[i])
            }
        }

        //if singleton == false, do not register so that it is created again next time it gets injected
        if(beanDefinition.singleton != false)
            beans[id] = bean;

        return bean;
    };

    /**
     * Executes bean method post construction within the scope of the bean
     *
     * @private
     * @param {Object} bean The bean to execute the method on
     * @param {Object} postConstructDefinition The definition object containing the method name to call as well as attributes to pass to the method
     */
    function performPostConstructMethodCall(bean, postConstructDefinition) {
        console.log('DEBUG: Performing post construction method call  -  beanId: ' + bean.$id + '  -  method: ' + postConstructDefinition.method + '  -  arguments: ' + postConstructDefinition.arguments);
        bean[postConstructDefinition.method].apply(bean, postConstructDefinition.arguments);
    }

    /**
     * Removes a bean from the registry
     *
     * @public
     * @param {String} id
     */
    me.destroyBean = function(id) {
        delete beans[id];
    };

    /**
     * Add inject method to global scope to be used for bean injection
     *
     * @global
     * @param {String} id The id of the bean to return
     * @param {String} property (optional) The property on the associated bean to return
     * @returns {*}
     */
    global.inject = function(id, property) {
        //check for bean -  if bean doesn't instance exists call createBean
        var bean = beans[id] ? beans[id] : me.createBean(id, beanDefinitions[id]);;

        //check to see if injecting a bean property, return accordingly
        if(property) {
            console.log('DEBUG: Injecting bean property  -  id: ' + id + '  -  property: ' + property);
            return bean[property];
        } else {
            console.log('DEBUG: Injecting bean  -  id: ' + id);
            return bean;
        }
    }

    //construct object
    constructor();
}