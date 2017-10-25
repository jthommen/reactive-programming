// Subjects

// Observable and Observer at the same time
// Used to bridge reactive and non-reactive code
// Subjects don't need to hook into event streams but can produce their own

import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// const simple$ = new Rx.Subject();

// // Subscribe to subject as observer
// simple$.subscribe(createSubscriber('simple$'));

// // Control subject as observable
// simple$.next('Hello');
// simple$.next('World');
// simple$.complete();

// // can subscribe subject to another observable
// const interval$ = Rx.Observable.interval(1000).take(5);
// const intervalSubject$ = new Rx.Subject(); // Proxy for another observable
// interval$.subscribe(intervalSubject$);

// intervalSubject$.subscribe(createSubscriber('sub1'));
// intervalSubject$.subscribe(createSubscriber('sub2'));
// intervalSubject$.subscribe(createSubscriber('sub3'));

// setTimeout(() => {
//     intervalSubject$.subscribe(createSubscriber('Look at me!')); // Subscription to interval subject
// }, 1000); // timeout is shared


// // Kick-off workflow with Subjects
// const currentUser$ = new Rx.Subject();
// const isLoggedIn$ = currentUser$.map(u => u.isloggedIn);

// isLoggedIn$.subscribe(createSubscriber('isLoggedIn'));

// currentUser$.next({ isloggedIn: false });

// setTimeout( () => {
//     currentUser$.next({isloggedIn: true, name: 'hello'});
// }, 1500);

// // Problem: Delayed subscription is not providing a value
// setTimeout( () => {
//     isLoggedIn$.subscribe(createSubscriber('delayed'));
// }, 3000);
// // Can be fixed with new Rx.BehaviorSubject({isLoggedIn: false});
// // Delivers one item/state on subscription


// // Replay Subject emits more than one value on subscription
// const replay$ = new Rx.ReplaySubject(3); // amount of items in the buffer on new subscription
// replay$.next(1);
// replay$.next(2);
// replay$.subscribe(createSubscriber('one'));

// replay$.next(3);
// replay$.next(4);
// replay$.next(5);
// replay$.subscribe(createSubscriber('two'));

// replay$.next(6);


// Async Subject
const apiCall$ = new Rx.AsyncSubject(); // Only returns last item before completion
apiCall$.next(1);

apiCall$.subscribe(createSubscriber('one'));
apiCall$.next(2);
apiCall$.complete();

setTimeout(() => {
    apiCall$.subscribe(createSubscriber('two'));
}, 2000);
