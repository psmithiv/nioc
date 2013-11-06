
//wire up module
exports = module.exports = init;

/**
 * @class
 */
function init(config) {
    /**
     * @private
     * @type {*}
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
    function constructor() {
        me.configArray = config;
    };

    //construct object
    constructor();
}