'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Conventional callback error handling
// fs.readdir('./src-server', (err, items) => {
//     if(err) console.error(err);
//     else {
//         console.log(items);
//     }
// });

// Error callback handling with RxJS
var readdir$ = _Rx2.default.Observable.bindNodeCallback(_fs2.default.readdir);

console.log(typeof readdir$ === 'undefined' ? 'undefined' : _typeof(readdir$));
readdir$('./src-server') // takes callback and replaces with observable that emitts events
.mergeMap(function (files) {
    return _Rx2.default.Observable.from(files);
}) // Convert array into observable with next calls
.map(function (file) {
    return 'MANIPULATED ' + file;
}).subscribe((0, _util.createSubscriber)('readdir'));

// Promises
function getItem() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('Hello');
        }, 1000);
    });
}

_Rx2.default.Observable.fromPromise(getItem()).subscribe((0, _util.createSubscriber)('promise'));