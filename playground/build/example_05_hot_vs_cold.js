'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const interval$ = Rx.Observable.interval(1000).take(10) // Interval is 'cold' by default
//     .publish(); // Make observable 'hot' 

// setTimeout(() => {
//     interval$.connect(); // connects to hot observable which then starts executing    
// }, 5000);

// setTimeout(() =>{
//     interval$.subscribe(createSubscriber('One'));
// }, 1200);

// setTimeout(() =>{
//     interval$.subscribe(createSubscriber('Two'));
// }, 3000);

// // Application of hot observables
// const socket = {on: () => {} };

// const chatMessages$ = new Rx.Observable(observer => {
//     console.log('subscribed');
//     socket.on('chat:message', message => observer.next(message));
// }).publish();

// chatMessages$.connect();

// chatMessages$.subscribe(createSubscriber('one'));
// chatMessages$.subscribe(createSubscriber('two'));

// Hot vs. Cold Observables
var simple$ = new _Rx2.default.Observable(function (observer) {
    observer.next('one');
    observer.next('two');
    observer.complete();

    return function () {
        return console.log('Disposed');
    };
});

var published$ = simple$.publishLast(); // Uses async method under the hood

var sub1 = published$.subscribe((0, _util.createSubscriber)('one'));
var connection = published$.connect();
var sub2 = published$.subscribe((0, _util.createSubscriber)('two'));

// Cleaning up hot observable subscription
sub1.unsubscribe();
sub2.unsubscribe();
// Observable is still there

connection.unsubscribe(); // stops 'hot' observable

// refCount() connects on first subscription, disconnects on last 
// share() = .publish().refCount()