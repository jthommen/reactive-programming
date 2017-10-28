'use strict';
var _Rx = require('rxjs/Rx');var _Rx2 = _interopRequireDefault(_Rx);
var _util = require('./lib/util');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Primitive functions
// Built in Functions
_Rx2.default.Observable.interval(500) // Creates events to certain interval
.take(5) // Limits amount of events emitted
.subscribe((0, _util.createSubscriber)('interval'));
_Rx2.default.Observable.timer(5000) // Emitts event after certain time
.subscribe((0, _util.createSubscriber)('timer'));

_Rx2.default.Observable.of('Hello world', 42, 'woah', ['this is an array', 'hey']) // emits arguments specified
.subscribe((0, _util.createSubscriber)('of'));

_Rx2.default.Observable.from(['hey', 42, 'woah']) // Takes array and flattens it out
.subscribe((0, _util.createSubscriber)('from'));

var arr = [1, 2, 3, 4, 5];
_Rx2.default.Observable.from(arr).
map(function (i) {return i * 5;}).
subscribe((0, _util.createSubscriber)('from map'));

_Rx2.default.Observable.throw(new Error('ERROR')) // Throws an error
.subscribe((0, _util.createSubscriber)('error'));

_Rx2.default.Observable.empty() // Returns empty observable --> complete message
.subscribe((0, _util.createSubscriber)('empty'));


var sideEffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {// Creates generator function every time subscription happens
    sideEffect++;
    return _Rx2.default.Observable.of(sideEffect);
});

defer$.subscribe((0, _util.createSubscriber)('defer$.one'));
defer$.subscribe((0, _util.createSubscriber)('defer$.two'));
defer$.subscribe((0, _util.createSubscriber)('defer$.three'));

_Rx2.default.Observable.never() // Produces no items and doesn't complete
.subscribe((0, _util.createSubscriber)('never'));

_Rx2.default.Observable.range(10, 30) // emits events with value in defined range
.subscribe((0, _util.createSubscriber)('range'));