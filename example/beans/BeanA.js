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
     * @type {*}
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
    function constructor() {
        me.configProp1 = config.configProp1;
        me.configProp2 = config.configProp2;
    };

    me.postConstructA = function(stringArgument, numberArgument) {
        console.log('INFO: BeanA.postConstructA  -  stringArgument: ' + stringArgument + '  -  numberArgument: ' + numberArgument);
    }

    me.postConstructB = function(arrayArgument) {
        console.log('INFO: BeanA.postConstructB  -  arrayArgument: ' + arrayArgument);
    }

    //construct object
    constructor();
}