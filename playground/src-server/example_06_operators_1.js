// Common RxJS Operators: Do / Finally / StartWith / Filter

import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';


// Creating side effects with do
Rx.Observable.range(1, 10)
    // Do stuff with value from range() before it goes to map()
    .do(a => console.log(`From do ${a}`))
    .map(a => a * a)
    .subscribe(createSubscriber("simple"));


// Finally
Rx.Observable.range(1, 10)
    // Way to effect side-effects when the sequence completes
    .finally(() => console.log('From finally'))
    .map(a => a * 2)
    .subscribe(createSubscriber('finally'));


// Filter
Rx.Observable.range(1, 10)
    .filter(a => a < 5)
    .subscribe(createSubscriber('filter'));
// finishes after range completes


// Interval
Rx.Observable.interval(1000)
    .startWith(-1) // merging in first value
    .subscribe(createSubscriber('interval'));

