//wire up module
exports = module.exports = init;

/**
 * @class
 */
function init() {
    /**
     * @private
     * @type {BeanC}
     */
    var me = this;

    /**
     * @private
     * @type {BeanA}
     */
    var beanA = inject('beanA');

    /**
     * @public
     * @type {BeanA}
     */
    me.beanAA = inject('beanAA');

    /**
     * @public
     * @type {BeanB}
     */
    me.beanB = inject('beanB');

    /**
     * @public
     * @type {Array}
     */
    me.beanBConfigArray = inject('beanB', 'configArray');

    /**
     * @public
     * @type {Function}
     * @return {String}
     */
    me.getBeanAConfigProp1 = function() {
        return beanA.configProp1;
    }
}