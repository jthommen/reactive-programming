// Traditional Implemention: Autocompelte with jQuery

// Import jQuery
import $ from 'jquery';

// Save jQuery html objects in constants for easy access
const $title = $('#title');
const $results = $('#results');

// Variables for bug fixes
let lastQuery = null;
let lastTimeout = null;
let nextQueryId = 0;

$title.on('keyup', e => {
    const title = e.target.value;

    // Check if query changed
    if (title === lastQuery) {
        return;
    }
    lastQuery = title;

    // Only query every 500ms
    if(lastTimeout){
        window.clearTimeout(lastTimeout);
    }

    // Assigns ids to queries and only shows them if last query resolved
    let ourQueryId = ++nextQueryId;
    lastTimeout = window.setTimeout(() => {
        getItems(title).then(items => {

            // Throw away results if they're not the last one
            if(ourQueryId != nextQueryId)
                return;

            $results.empty();

            const $items = items.map(item => $('<li />').text(item));
            $results.append($items);
        });
    }, 500);

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