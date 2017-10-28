// Reactive Implemention: Autocompelte with RxJS

// Three issues to fix:
// 1. Non character input causes new queries
// 2. Queries on ever keystroke
// 3. Results are shown before last request is resolved

import $ from 'jquery';
import Rx from 'rxjs/Rx';

const $title = $('#title');
const $results = $('#results');

// Returns observable stream of keyup event --> Stream of events
const keyUps$ = Rx.Observable.fromEvent($title, 'keyup');

// New observable that maps keyup events to queries incl. transformations
const queries$ = keyUps$
    .map(e => e.target.value)
    .distinctUntilChanged() // only produces value if it changed
    .debounceTime(500) // Only emits event every 500ms
    .switchMap(query => getItems(query)); // flatMap / SelectMany
    // takes event, calls function with event and merges results of function call into stream again
    // only produces a result from the last event in the stream

queries$.subscribe(items => {
        $results.empty();
        $results.append(items.map(r => $('<li />').text(r)));
});


// ------------
// Library
// ------------

// Simulates an API call to a DB
function getItems(title){
    console.log(`Querying ${title}`);
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, "item2", `Another ${Math.random()}`]);
        }, 500 + (Math.random() * 200));
    });
}