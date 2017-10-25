// Creating Observables

import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

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
function createInterval$(time) {
    return new Rx.Observable(observer => {
        let index = 0;
        // cleaning up observable creation after unsubscribing
        let interval = setInterval(() => {
            console.log(`Generating ${index}`);
            observer.next(index++);
        }, time);

        // Invoked when unsubscription happens
        return () => {
            clearInterval(interval);
        };
    });
}

// Operator
// Observable that grabs another observable
function take$(sourceObservable$, amount) {
    return new Rx.Observable(observer => {
        let count = 0;
        const subscription = sourceObservable$.subscribe({
            next(item) { 
                observer.next(item);
                if(++count >= amount){
                    observer.complete();
                }
            },
            error(error) { observer.error(error); },
            complete() { observer.complete(); }
        });

        return () => subscription.unsubscribe();
    });
}

const everySecond$ = createInterval$(1000);
const firstFiveSecond$ = take$(everySecond$, 5);
const subscription = firstFiveSecond$.subscribe(createSubscriber('one'));

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 3500);
