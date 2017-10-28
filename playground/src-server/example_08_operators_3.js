// Common RxJS Operators: map / switchmap / mergemap

import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// // Map
// Rx.Observable.interval(1000)
//     .take(3)
//     .map(a => a * a)
//     .subscribe(createSubscriber('map'));


// MergeMap (select many)
// Array implementation

// function arrayMap(array, projection) {
//     const returnArray = [];
//     for (let item of array) {
//         const projected = projection(item);
//         returnArray.push(projected);
//     }

//     return returnArray;
// }

// arrayMap([1, 2, 3], a => a * a);


// // Used for nested mapping operations --> Returning only one array instead of nested arrays
// function arrayMergeMap(array, projection) {
//     const returnArray = [];
//     for(let item of array) {
//         const projectedArray = projection(item);
//         for(let projected of projectedArray) {
//             returnArray.push(projected);
//         }
//     }
//     return returnArray;

// }

// const albums = [
//     { title: "album1", tracks: [{id: 1, title: "Track1" }, {id: 2, title: "Track2"}] },
//     { title: "album2", tracks: [{id: 1, title: "Track1" }, {id: 2, title: "Track2"}] },
//     { title: "album3", tracks: [{id: 1, title: "Track1" }, {id: 2, title: "Track2"}] }
// ];

// const tracksWrong = arrayMap(albums, album => album.tracks);
// const tracksRight = arrayMergeMap(albums, album => album.tracks);

// console.log(JSON.stringify(tracksWrong));
// console.log(JSON.stringify(tracksRight));

// Rx.Observable.range(2,3)
//     .mergeMap(i => Rx.Observable.timer(i * 2000).map(() => `After ${i*2} Seconds`))
//     .subscribe(createSubscriber('mergeMap'));


// // Mergemap enables manipulation of single objects from a Promise
// Rx.Observable.fromPromise(getTracks())
//     .mergeMap(tracks => Rx.Observable.from(tracks))
//     .subscribe(createSubscriber('tracks'));

// function getTracks() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             resolve(["Track 1", "Track 2", "Track 3"]);
//         }, 1000);
//     });
// }

// Async Operations with mergemap
Rx.Observable.of("my query")
    .do( () => console.log("Querying"))
    .mergeMap(a => query(a))
    .do( () => console.log("After querying"))
    .subscribe(createSubscriber("query"));


function query(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('new Value');
        }, 1000);
    });
}
