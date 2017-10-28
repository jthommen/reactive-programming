'use strict';

var _Rx = require('rxjs/Rx');var _Rx2 = _interopRequireDefault(_Rx);
var _util = require('./lib/util');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


// Creating side effects with do
// Common RxJS Operators: Do / Finally / StartWith / Filter
_Rx2.default.Observable.range(1, 10) // Do stuff with value from range() before it goes to map()
.do(function (a) {return console.log('From do ' + a);}).
map(function (a) {return a * a;}).
subscribe((0, _util.createSubscriber)("simple"));


// Finally
_Rx2.default.Observable.range(1, 10)
// Way to effect side-effects when the sequence completes
.finally(function () {return console.log('From finally');}).
map(function (a) {return a * 2;}).
subscribe((0, _util.createSubscriber)('finally'));


// Filter
_Rx2.default.Observable.range(1, 10).
filter(function (a) {return a < 5;}).
subscribe((0, _util.createSubscriber)('filter'));
// finishes after range completes


// Interval
_Rx2.default.Observable.interval(1000).
startWith(-1) // merging in first value
.subscribe((0, _util.createSubscriber)('interval'));