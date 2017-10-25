// Built in Functions
import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// Primitive functions
Rx.Observable.interval(500) // Creates events to certain interval
    .take(5)  // Limits amount of events emitted
    .subscribe(createSubscriber('interval'));

Rx.Observable.timer(5000) // Emitts event after certain time
    .subscribe(createSubscriber('timer'));

Rx.Observable.of('Hello world', 42, 'woah', ['this is an array', 'hey']) // emits arguments specified
    .subscribe(createSubscriber('of'));

Rx.Observable.from(['hey', 42, 'woah']) // Takes array and flattens it out
    .subscribe(createSubscriber('from'));

const arr = [1,2,3,4,5];
Rx.Observable.from(arr)
    .map(i => i * 5)
    .subscribe(createSubscriber('from map'));

Rx.Observable.throw(new Error('ERROR')) // Throws an error
    .subscribe(createSubscriber('error'));

Rx.Observable.empty() // Returns empty observable --> complete message
    .subscribe(createSubscriber('empty'));


let sideEffect = 0;
const defer$ = Rx.Observable.defer( () => { // Creates generator function every time subscription happens
    sideEffect++;
    return Rx.Observable.of(sideEffect);
});

defer$.subscribe(createSubscriber('defer$.one'));
defer$.subscribe(createSubscriber('defer$.two'));
defer$.subscribe(createSubscriber('defer$.three'));

Rx.Observable.never() // Produces no items and doesn't complete
    .subscribe(createSubscriber('never'));

Rx.Observable.range(10, 30) // emits events with value in defined range
    .subscribe(createSubscriber('range'));
