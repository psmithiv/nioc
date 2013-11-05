//wire up module
exports = module.exports = init;

/**
 * @class
 */
function init(config) {
    /**
     * @private
     * @type {BeanB}
     */
    var me = this;

    /**
     * @public
     * @type {Array}
     */
    me.configArray = [];

    /**
     * @constructor
     */
    (function() {
        me.configArray = config;
    })();
}