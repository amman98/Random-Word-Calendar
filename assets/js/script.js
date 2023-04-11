// Google API
// Initialize current date var
const date = new Date();
// Convert current date to rfc3339 timestamp for the Google API
const formattedDate = date.toISOString();

// shows current month and year in header
function viewCurrentDate(date) {
    var currentDateEl = document.querySelector("#month-year-date");
    currentDateEl.textContent = date.format("MMMM, YYYY");
    console.log(date.format("M/YYYY"));
}

 async function getCurrentWeek(date){
    // If no param is passed, set the date to the current date
    if(!date) date = dayjs();
    // Display the current month & year in header
    viewCurrentDate(date);
    // Loops thru IDs for the 7 displayed day-blocks
    for (let i = 1; i <= 7; i++) {
        let currentDayWeekEl = document.getElementById("dayWeek" + i);
        let currentDayNumberWeekEl = document.getElementById("daynumber" + i);
        // Set the page element based on the current date
        currentDayWeekEl.textContent = date.format('ddd');
        currentDayNumberWeekEl.textContent = date.format('D');
        // Create dateString to use as a key for local storage
        const dateString = date.format('YYYY-MM-DD');
        // Load localstorage value for dateString, set to text.content for this day
        date = date.add(1, 'day');

        // give the object holidays a key(date) to the upcoming holiday
        const holiday = holidays[dateString];
        if(holiday) {
            console.log(holiday);
        }
    }
}

// URL without path
let holidayListUrl = "https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?";
// Generate query params
// Reference: https://stackoverflow.com/questions/316781/how-to-build-query-string-with-javascript
const params = new URLSearchParams({
    key: "AIzaSyBBIgCp8FhEZz9qwGFEbm1FQULEkZhDjJc",
    timeMin: formattedDate,
    timeZone: "PST"
});
// Add query params
holidayListUrl += params.toString();
// Tests
console.log(holidayListUrl);
console.log(date);

async function getApiHoliday() {
    const response = await fetch(holidayListUrl);
    // Check if response was actually loaded successfully. If not log the whole object.
    if (!response.ok) {
        console.log(response);
        return;
    }
    const data = await response.json();
    //console.log(data);

    const holidays = {};

    // Loop over the data
    for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        holidays[item.start.date] = item.summary;
    }
    console.log(holidays);
    return holidays;
    // Display an array of objects
    //holidays.forEach(element => console.log(element.holiday + " " + element.date));
}
// Call the func
// getApiHoliday();


// Random Rare Word API
let randomWordUrl = "https://wordsapiv1.p.rapidapi.com/words?random=true&frequencyMax=1.74&hasDetails=typeOf";

// fetches response from the random word API and displays the random word to the screen
function getApiWord(){
    // elements for generating random word
    var displayBoxEl = document.querySelector("#definitionBox");
    var wordEl = document.querySelector("#definitionWord");
    var typeEl = document.createElement("i");
    var descEl = document.querySelector("#definitionDesc");


    fetch(randomWordUrl, {
        headers: {
            "X-RapidAPI-Key": "459f025071mshad92206dba64d57p1df22ajsnac8136e5c3da",
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
    })
    .then(function (response) {
        if (!response.ok) {
            console.log(response);
            return;
        }

        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (displayBoxEl.style.display === "none") {        
            displayBoxEl.style.display = "block";    
        }

        const wordDefinition = {
            word: data.word,
            definition: data.results[0]["definition"],
            partOfSpeech: data.results[0]["partOfSpeech"]
        }

        wordEl.textContent = wordDefinition.word + ": ";
        typeEl.textContent = wordDefinition.partOfSpeech;
        wordEl.appendChild(typeEl);
        descEl.textContent = wordDefinition.definition;
        console.log(typeEl.textContent);
    });
    //console.log(wordDefinition);
}

// generate random word on button click
var generateButtonEl = document.querySelector("#randomWord");
generateButtonEl.addEventListener("click", getApiWord);

// The below shows test options for the get current week function
// getCurrentWeek(dayjs().add(9,"days"));
// getCurrentWeek(dayjs('2000-07-18'))

// Save the holidaysAPI return here
// It returns an object where the key:date and the value:holiday
let holidays;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
// The above docs explain how getApiHoliday works
// getCurrentWeek only loads after we get the holiday list
getApiHoliday().then(function(res) {
    holidays = res
    getCurrentWeek();
    // Entering the date console logs the holidays associated with the date
    // getCurrentWeek(dayjs('2023-12-25')
})