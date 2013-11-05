//wire up module
exports = module.exports = init;

/**
 * Example bean
 *
 * @class
 */
function init(config) {
    /**
     * @private
     * @type {BeanA}
     */
    var me = this;

    /**
     * @public
     * @type {String}
     */
    me.configProp1 = '';

    /**
     * @public
     * @type {String}
     */
    me.configProp2 = '';

    /**
     * @constructor
     */
    (function constructor() {
        me.configProp1 = config.configProp1;
        me.configProp2 = config.configProp2;
    })();
}