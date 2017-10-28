'use strict';

var _Rx = require('rxjs/Rx');var _Rx2 = _interopRequireDefault(_Rx);
var _util = require('./lib/util');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// -------------------------
// Part 1
// -------------------------

// // Promises 
// // are very close to observables
// const promise = new Promise((resolve, reject) => { // Generator function
//     console.log('In promise:');
//     resolve('hey');
// }); // eager --> executes without subscription

// promise.then(item => console.log(item));


// // Observable
// const simple$ = new Rx.Observable(observer => {
//     console.log('Generating observable');
//     setTimeout(() => {
//         observer.next('An item!');
//         setTimeout(() =>{
//             observer.next('Another item!');
//             observer.complete();
//         }, 1000);
//     }, 1000);
// });
// // not run until subscription is created --> lazy

// const error$ = new Rx.Observable(observer => {
//     observer.error(new Error('WOAH'));
// });

// // Subscription
// // Syntax 1
// error$.subscribe(
//     item => console.log(`one.next ${item}`), // execute on next item
//     error => console.log(`one.error ${error.stack}`), // execute on error
//     () => console.log('one.complete') // execute on complete
// );

// // Syntax 2
// setTimeout(() => {
//     simple$.subscribe({
//         next: item => console.log(`two.next ${item}`),
//         error(error) {
//             console.log(`two.error ${error}`)
//         },
//         complete: function(){
//             console.log('two.complete')
//         }
//     });
// }, 3000);

// // Every subscription reruns generator function (observable)

// -------------------------
// Part 2
// -------------------------

// Creates observable
// Creating Observables
function createInterval$(time) {return new _Rx2.default.Observable(function (observer) {
        var index = 0;
        // cleaning up observable creation after unsubscribing
        var interval = setInterval(function () {
            console.log('Generating ' + index);
            observer.next(index++);
        }, time);

        // Invoked when unsubscription happens
        return function () {
            clearInterval(interval);
        };
    });
}

// Operator
// Observable that grabs another observable
function take$(sourceObservable$, amount) {
    return new _Rx2.default.Observable(function (observer) {
        var count = 0;
        var subscription = sourceObservable$.subscribe({
            next: function next(item) {
                observer.next(item);
                if (++count >= amount) {
                    observer.complete();
                }
            },
            error: function error(_error) {observer.error(_error);},
            complete: function complete() {observer.complete();} });


        return function () {return subscription.unsubscribe();};
    });
}

var everySecond$ = createInterval$(1000);
var firstFiveSecond$ = take$(everySecond$, 5);
var subscription = firstFiveSecond$.subscribe((0, _util.createSubscriber)('one'));

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 3500);