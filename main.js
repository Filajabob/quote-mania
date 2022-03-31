function processGuess(event) {
    var guess = document.getElementById("guess-input").value;
    
    if (guess != quoteAuthor) {
        results.textContent = "Incorrect!"
    } else {
        results.textContent = "Correct!"
    }

    event.preventDefault();
}

function jsonChoice(jsonData) {
    // https://stackoverflow.com/a/49687370
    // Create array of object keys, ["311", "310", ...]
    const keys = Object.keys(jsonData)

    // Generate random index based on number of keys
    const randIndex = Math.floor(Math.random() * keys.length)

    // Select a key from the array of keys using the random index
    const randKey = keys[randIndex]

    // Use the key to get the corresponding name from the "names" object
    return [randKey, jsonData[randKey]]
}

function processJSON(event) {
    var json = this.responseText;
    var quotes = JSON.parse(json);

    const quote = document.getElementById("quote"); // the quote element in the HTML

    const choice = jsonChoice(quotes);
    const quoteAuthor = choice[0]
    quote.innerHTML = '"' + choice[1][Math.floor(Math.random() * choice.length)] + '"';
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "assets/game/quotes.json");
xhr.addEventListener('load', processJSON);
xhr.send();

const form = document.getElementById("guess-form");
const results = document.getElementById("results");
form.addEventListener('submit', processGuess);