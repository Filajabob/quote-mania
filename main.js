var totalGuesses = 0;
var hasVisited = sessionStorage.getItem('washere');

if (!hasVisited) {
    alert("Try to guess who said the quote.");
    sessionStorage.setItem('washere', true);
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

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

readTextFile("assets/game/quotes.json", function(text){
    var data = JSON.parse(text);
    const choice = jsonChoice(data);
    const quoteAuthor = choice[0]
    const quote = choice[1][randInt(0, choice[1].length - 1)]

    document.getElementById("quote").textContent = quote;

    const form = document.getElementById("guess-form");
    const results = document.getElementById("results");
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var guess = document.getElementById("active-guess-input").value;
    
        checkQuotes: if (guess.toLowerCase() != quoteAuthor.toLowerCase()) {
            document.body.style.backgroundColor = "red";
            document.body.style.color = "white";

            setTimeout(() => document.body.style.backgroundColor = "white", 2000);
            setTimeout(() => document.body.style.color = "black", 2000);

            if (totalGuesses > 4) { // five guesses
                results.textContent = "You have used all your guesses.\nThe answer was " + quoteAuthor + "!"
                document.getElementById("active-guess-input").setAttribute("readonly", "readonly")
                document.getElementById("submit").disabled = true;

                if (randInt(0, 3) == 1) {
                    setTimeout(() => location.href = "https://cat-bounce.com", 3000);
                }

                break checkQuotes;
            }

            totalGuesses++;
            results.textContent = "Incorrect. " + String(6 - totalGuesses) + " guesses left!"

            
        } else {
            document.body.style.backgroundColor = "green";
            document.body.style.color = "white"

            setTimeout(() => document.body.style.backgroundColor = "white", 2000);
            setTimeout(() => document.body.style.color = "black", 2000);

            results.innerHTML = "<strong>How'd you know?</strong>";
            document.getElementById("submit").disabled = true;
        }

        
    });
})

