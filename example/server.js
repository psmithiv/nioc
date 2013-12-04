//Require and Instantiate NIoc
var nioc = require('nioc');
new nioc('../../../beans.json');

console.log('');

//Inject Beans
//BeanA instance 1
var beanA = inject('beanA');
console.log('INFO: beanA.configProp1: ' + beanA.configProp1);
console.log('INFO: beanA.configProp2: ' + beanA.configProp2 + '\n');

//BeanA instance 2
var beanAA = inject('beanAA');
console.log('INFO: beanAA.configProp1: ' + beanAA.configProp1);
console.log('INFO: beanAA.configProp2: ' + beanAA.configProp2 + '\n');

//BeanB
var beanB = inject('beanB');
console.log('INFO: beanB.configArray: ' + beanB.configArray + '\n');

//Beans Injected into Beans
//BeanC
var beanC = inject('beanC');
console.log('INFO: beanC.beanA (private): ' + beanC.beanA);
var getBeanAConfigProp1 = beanC.getBeanAConfigProp1();
console.log('INFO: beanC.getBeanAConfigProp1(): ' + getBeanAConfigProp1);
console.log('INFO: beanC.beanAA.configProp1: ' + beanC.beanAA.configProp1);
console.log('INFO: beanC.beanB.configArray: ' + beanC.beanB.configArray + '\n');

//Non Singleton Bean
//BeanD
var beanD = inject('beanD');
console.log('INFO: beanD.beanDProp: ' + beanD.beanDProp);
beanD.beanDProp = 'I am an updated BeanD';
console.log('INFO: updated beanD.beanDProp: ' + beanD.beanDProp + '\n');

var beanD2 = inject('beanD');
console.log('INFO: beanD2.beanDProp: ' + beanD2.beanDProp + '\n');

//Inject Bean Properties
//BeanA.configProp1
var beanAConfigProp1 = inject('beanA', 'configProp1');
console.log('INFO: beanAConfigProp1: ' + beanAConfigProp1);