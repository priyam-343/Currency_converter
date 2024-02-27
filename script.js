// include api for currency change
const api = "https://v6.exchangerate-api.com/v6/8f4d915cd537e1a268d9c34f/latest/USD";

// for selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrecy = document.querySelector(".from");
var toCurrecy = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var resultFrom = "USD"; // Initialize with default value
var resultTo = "EUR"; // Initialize with default value
var searchValue = 0; // Initialize with default value

// Event when currency is changed
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrecy.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', updateValue);

// function for updating value
function updateValue(e) {
    searchValue = parseFloat(e.target.value) || 0; // Parse float value or 0 if invalid
}

// when user clicks, it calls function getresults
convert.addEventListener("click", getResults);

// function getresults
function getResults() {
    finalValue.innerHTML = "Converting..";
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// display results after conversion
function displayResults(currency) {
    let fromRate = currency.conversion_rates[resultFrom];
    let toRate = currency.conversion_rates[resultTo];
    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

// when user clicks on reset button
function clearVal() {
    window.location.reload();
    finalValue.innerHTML = "";
}
