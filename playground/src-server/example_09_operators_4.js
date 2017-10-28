// Common RxJS Operators: Reduce / Scan

import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// // Reduce 
// // with Arrays
// function arrayReduce(array, accumulator, startValue){
//     let value = startValue;
//     for (let item of array) {
//         value = accumulator(value, item);
//     }

//     return value;
// }

// const values = [342, 123, 32, 35, 1];
// const sum = arrayReduce(values, (acc, i) => acc + i, 1);
// console.log(sum);

// const max = arrayReduce(
//     values,
//     function (acc, value) {
//         if (value > acc)
//             return value;
//         return acc;
//     },
//     -1
// );

// console.log(max);

Rx.Observable.range(1, 10)
    .reduce((acc, value) => acc + value)
    .subscribe(createSubscriber('reduce'));

// Scan works as reduces but doesn't wait for observable to complete before emitting value
// Very useful for hot observables
Rx.Observable.range(1, 10)
.scan((acc, value) => acc + value)
.subscribe(createSubscriber('reduce'));

// Getting first and last value
Rx.Observable.range(1, 10)
    .map(i => i * i)
    .scan(([last, _], current) => [current, last], [])
    .subscribe(createSubscriber("reduce"));
