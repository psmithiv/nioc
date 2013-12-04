//wire up module
exports = module.exports = init;

/**
 * @class
 */
function init() {
    /**
     * @private
     * @type {*}
     */
    var me = this;

    /**
     * @public
     * @type {String}
     */
    me.beanDProp = 'I am BeanD';

    /**
     * @constructor
     */
    function constructor() {

    }

    //construct object
    constructor();
}