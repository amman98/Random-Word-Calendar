// Google API
// Initialize current date var
const date = new Date();
// Convert current date to rfc3339 timestamp for the Google API
const formattedDate = date.toISOString();
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
    console.log(data);

    const holidays = [];

    // Loop over the data
    for (let i = 0; i < data.items.length; i++) {
        // Create reference to current item-object
        const item = data.items[i];
        // push array of objects {holiday: date}
        holidays.push({
            holiday: item.summary,
            date: item.start.date,
        });
    }
    console.log(holidays);
    // Display an array of objects
    holidays.forEach(element => console.log(element.holiday + " " + element.date));
}
// Call the func
// getApiHoliday();

// Random Rare Word API
let randomWordUrl = "https://wordsapiv1.p.rapidapi.com/words?random=true&frequencyMax=1.74&hasDetails=typeOf";

async function getApiWord(){
    const response = await fetch(randomWordUrl, {
        headers: {
            "X-RapidAPI-Key": "459f025071mshad92206dba64d57p1df22ajsnac8136e5c3da",
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
    });
    if (!response.ok) {
        console.log(response);
        return;
    }
    const data = await response.json();
    const wordDefinition = {
        word: data.word,
        definition: data.results[0]["definition"],
    }
    console.log(wordDefinition);
}
getApiWord();