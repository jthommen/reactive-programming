import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
import fs from 'fs';

// Conventional callback error handling
// fs.readdir('./src-server', (err, items) => {
//     if(err) console.error(err);
//     else {
//         console.log(items);
//     }
// });

// Error callback handling with RxJS
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);

console.log(typeof(readdir$));
readdir$('./src-server') // takes callback and replaces with observable that emitts events
    .mergeMap(files => Rx.Observable.from(files)) // Convert array into observable with next calls
    .map(file => `MANIPULATED ${file}`)
    .subscribe(createSubscriber('readdir'));


// Promises
function getItem() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello');
        }, 1000);
    });
}

Rx.Observable.fromPromise(getItem())
    .subscribe(createSubscriber('promise'));