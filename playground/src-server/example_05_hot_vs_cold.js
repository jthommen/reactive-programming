// Hot vs. Cold Observables
import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

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

const simple$ = new Rx.Observable(observer => {
    observer.next('one');
    observer.next('two');
    observer.complete();

    return () => console.log('Disposed');
});

const published$ = simple$.publishLast(); // Uses async method under the hood

const sub1 = published$.subscribe(createSubscriber('one'));
const connection = published$.connect();
const sub2 = published$.subscribe(createSubscriber('two'));

// Cleaning up hot observable subscription
sub1.unsubscribe();
sub2.unsubscribe();
// Observable is still there

connection.unsubscribe(); // stops 'hot' observable