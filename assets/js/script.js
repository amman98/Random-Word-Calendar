//Calendar JS 

//calendar framework url: "https://codepen.io/alvarotrigo/pen/bGLpROa"
//Toggle Button Framework url: "https://ionicframework.com/docs/" 

//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        calMonthName: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return calendarControl.firstDay().getDay() + 1;
        },
        lastDayNumber: function () {
            return calendarControl.lastDay().getDay() + 1;
        },
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                0
            ).getDate();
            return lastDate;
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToCurrentMonth: function () {
            let currentMonth = calendarControl.localDate.getMonth();
            let currentYear = calendarControl.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setYear(currentYear);
            calendarControl.attachEventsOnNextPrev();
        },
        displayYear: function () {
            let yearLabel = document.querySelector(".calendar .calendar-year-label");
            yearLabel.innerHTML = calendar.getFullYear();
        },
        displayMonth: function () {
            let monthLabel = document.querySelector(
                ".calendar .calendar-month-label"
            );
            monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
        },
        selectDate: function (e) {
            getCurrentWeek(dayjs(`${e.target.textContent} ${
                calendarControl.calMonthName[calendar.getMonth()]
            } ${calendar.getFullYear()}`));
            console.log(
                `${e.target.textContent} ${
                    calendarControl.calMonthName[calendar.getMonth()]
                } ${calendar.getFullYear()}`
            );
        },
        plotSelectors: function () {
            document.querySelector(
                ".calendar"
            ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">Today: 
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
            ${calendarControl.localDate.getDate()}, 
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
        },
        plotDayNames: function () {
            for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
            }
        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            calendarControl.plotDayNames();
            calendarControl.displayMonth();
            calendarControl.displayYear();
            let count = 1;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );
            // dates of current month
            for (let i = 1; i < calendarDays; i++) {
                if (i < calendarControl.firstDayNumber()) {
                    prevDateCount += 1;
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
                }
            }
            //remaining dates after month dates
            for (let j = 0; j < prevDateCount + 1; j++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
            }
            calendarControl.highlightToday();
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
        },
        attachEvents: function () {
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            let todayDate = document.querySelector(".calendar .calendar-today-date");
            let dateNumber = document.querySelectorAll(".calendar .dateNumber");
            prevBtn.addEventListener(
                "click",
                calendarControl.navigateToPreviousMonth
            );
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
            todayDate.addEventListener(
                "click",
                calendarControl.navigateToCurrentMonth
            );
            for (var i = 0; i < dateNumber.length; i++) {
                dateNumber[i].addEventListener(
                    "click",
                    calendarControl.selectDate,
                    false
                );
            }
        },
        highlightToday: function () {
            let currentMonth = calendarControl.localDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.localDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (
                currentYear === changedYear &&
                currentMonth === changedMonth &&
                document.querySelectorAll(".number-item")
            ) {
                document
                    .querySelectorAll(".number-item")
                    [calendar.getDate() - 1].classList.add("calendar-today");
            }
        },
        plotPrevMonthDates: function (dates) {
            dates.reverse();
            for (let i = 0; i < dates.length; i++) {
                if (document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function () {
            let childElemCount = document.querySelector('.calendar-body').childElementCount;
            //7 lines
            if (childElemCount > 42) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            //6 lines
            if (childElemCount > 35 && childElemCount <= 42) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(42 - childElemCount);
            }

        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotSelectors();
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

const calendarControl = new CalendarControl();

var calendarBtnEl = document.querySelector("#hamburger");
var mobileBlackout = document.querySelector("#mobileBlackout");
var calendarMobile = document.querySelector("#calendar");
var isVisible = true;

//Button Display Functionality for Mobile View

function showCalendar(event) {
    if (isVisible) {
        mobileBlackout.classList.add('mobilehide');
        calendarMobile.classList.remove('hideit');
    } else {
        mobileBlackout.classList.remove('mobilehide');
        calendarMobile.classList.add('hideit');
    }
    isVisible = !isVisible;
};

calendarBtnEl.addEventListener("click", showCalendar);

// Google API
// Initialize current date var
const date = new Date();
// Convert current date to rfc3339 timestamp for the Google API
const formattedDate = date.toISOString();

// shows current month and year in header
function viewCurrentDate(date) {
    var currentDateEl = document.getElementById("month-year-date");
    currentDateEl.textContent = date.format("MMMM, YYYY");
    console.log(date.format("M/YYYY"));
}

function addWeek() {
    getCurrentWeek((weekStartDate.add(7, 'days')))
}
function removeWeek() {
    getCurrentWeek((weekStartDate.add(-7, 'days')))
}

let weekStartDate;
async function getCurrentWeek(date) {
    // If no param is passed, set the date to the current date
    if (!date) date = dayjs();
    weekStartDate = date;
    // Display the current month & year in header
    viewCurrentDate(date);
    // Loops thru IDs for the 7 displayed day-blocks
    for (let i = 1; i <= 7; i++) {
        const currentDayWeekEl = document.getElementById("dayWeek" + i);
        const currentDayNumberWeekEl = document.getElementById("daynumber" + i);
        const holidayEl = document.getElementById("holiday" + i);
        // Set the page element based on the current date
        currentDayWeekEl.textContent = date.format('ddd');
        currentDayNumberWeekEl.textContent = date.format('D');
        // Create dateString to use as a key for local storage
        const dateString = date.format('YYYY-MM-DD');
        // Load localstorage value for dateString, set to text.content for this day
        date = date.add(1, 'day');

        const buttonEl = document.getElementById('userSave' + i);
        // Set date on each button to connect button to the appropriate text area / user input
        buttonEl.setAttribute('data-date', dateString);

        // Get userInput from local storage
        const eventText = localStorage.getItem(dateString);
        // Display userInput on the page
        const textareaEl = document.getElementById("userEvent" + i);
        textareaEl.value = eventText;

        const buttonClearEl = document.getElementById('userClear' + i);
        buttonClearEl.setAttribute('data-date', dateString);

        // give the object holidays a key(date) to the upcoming holiday
        const holiday = holidays[dateString];
        if (holiday) {
            console.log(holiday);
            holidayEl.removeAttribute('hidden');
            holidayEl.textContent = holiday;
        } else {
            holidayEl.setAttribute('hidden', true);
        }
    }
}

async function getApiHoliday() {
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

// Random Rare Word API
let randomWordUrl = "https://wordsapiv1.p.rapidapi.com/words?random=true&frequencyMax=1.74&hasDetails=typeOf";

// fetches response from the random word API and displays the random word to the screen
const storedWords = [];
let storedWordsIndex;

function previousWord() {
    //document.getElementById("testButtonNextWord").disabled = false;
    storedWordsIndex --;
    //document.getElementById("testButtonPrevWord").disabled = storedWordsIndex < 1;
    displayWord(storedWords[storedWordsIndex]);
}
function disableWordButtons(){
    document.getElementById("testButtonPrevWord").disabled = true;
    document.getElementById("testButtonNextWord").disabled = true;
}

function nextWord() {
    //document.getElementById("testButtonPrevWord").disabled = false;
    storedWordsIndex ++;
    //document.getElementById("testButtonNextWord").disabled = storedWordsIndex === storedWords.length - 1;
    displayWord(storedWords[storedWordsIndex]);
}

function displayWord(wordDefinition) {
    // elements for generating random word
    var displayBoxEl = document.querySelector("#definitionBox");
    var wordEl = document.querySelector("#definitionWord");
    var typeEl = document.createElement("i");
    var descEl = document.querySelector("#definitionDesc");

    wordEl.textContent = wordDefinition.word + ": ";
    typeEl.textContent = wordDefinition.partOfSpeech;
    wordEl.appendChild(typeEl);
    descEl.textContent = wordDefinition.definition;
    console.log(typeEl.textContent);
    displayBoxEl.classList.remove('hidden');
}
function getApiWord() {
    // if (){
    //     disableWordButtons();
    // }
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

            const wordDefinition = {
                word: data.word,
                definition: data.results[0]["definition"],
                partOfSpeech: data.results[0]["partOfSpeech"]
            }
            displayWord(wordDefinition);
            storedWords.push(wordDefinition);
            storedWordsIndex = storedWords.length - 1;
            console.log(storedWords);
        });
}

// generate random word on button click
var generateButtonEl = document.querySelector("#randomWord");
generateButtonEl.addEventListener("click", getApiWord);

let holidays;

document.querySelectorAll('.userSave').forEach(el => {
    console.log(el);
    el.addEventListener('click', clickSave);
})

function clickSave(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    // Get the clicked button ID, equals to userEvent1
    const textareaId = e.currentTarget.getAttribute('data-textarea-id');
    // Get dateString
    const date = e.currentTarget.getAttribute('data-date');
    // Access text area thru id 'userEvent1' that we got from button attribute
    const textareaEl = document.getElementById(textareaId);

    // resource for replace function params obtained here: https://futurestud.io/tutorials/remove-all-whitespace-from-a-string-in-javascript
    if(textareaEl.value.replace(/\s+/g, '') !== "") {
        localStorage.setItem(date, textareaEl.value);
    }
}

document.querySelectorAll('.userClear').forEach(el => {
    console.log(el);
    el.addEventListener('click', clickClear);
})

function clickClear(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    const textareaId = e.currentTarget.getAttribute('data-textarea-id');
    // textareaID = userEvent#
    const date = e.currentTarget.getAttribute('data-date');
    //date = dataString
    localStorage.removeItem(date);
    const textareaEl = document.getElementById(textareaId);
    textareaEl.value = "";
}
getApiHoliday().then(function (res) {
    holidays = res
    getCurrentWeek();
    // Entering the date console logs the holidays associated with the date
    // getCurrentWeek(dayjs('2023-12-25'))
})

// Dark Mode Button

var toggleButton = document.querySelector("#toggleButton")

var html = document.querySelector("#html");
var header = document.querySelector("#header");
var randomWord = document.querySelector("#randomWord");
var definitionBox = document.querySelector("#definitionBox");
var weekBox = document.querySelector("#weekBox");
var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");
var day6 = document.querySelector("#day6");
var day7 = document.querySelector("#day7");
var holiday1 = document.querySelector("#holiday1");
var holiday2 = document.querySelector("#holiday2");
var holiday3 = document.querySelector("#holiday3");
var holiday4 = document.querySelector("#holiday4");
var holiday5 = document.querySelector("#holiday5");
var holiday6 = document.querySelector("#holiday6");
var holiday7 = document.querySelector("#holiday7");
var userEvent1 = document.querySelector("#userEvent1");
var userEvent2 = document.querySelector("#userEvent2");
var userEvent3 = document.querySelector("#userEvent3");
var userEvent4 = document.querySelector("#userEvent4");
var userEvent5 = document.querySelector("#userEvent5");
var userEvent6 = document.querySelector("#userEvent6");
var userEvent7 = document.querySelector("#userEvent7");
var userClear1 = document.querySelector("#userClear1");
var userClear2 = document.querySelector("#userClear2");
var userClear3 = document.querySelector("#userClear3");
var userClear4 = document.querySelector("#userClear4");
var userClear5 = document.querySelector("#userClear5");
var userClear6 = document.querySelector("#userClear6");
var userClear7 = document.querySelector("#userClear7");
var userSave1 = document.querySelector("#userSave1");
var userSave2 = document.querySelector("#userSave2");
var userSave3 = document.querySelector("#userSave3");
var userSave4 = document.querySelector("#userSave4");
var userSave5 = document.querySelector("#userSave5");
var userSave6 = document.querySelector("#userSave6");
var userSave7 = document.querySelector("#userSave7");
var calendarDark = document.querySelector("#calendar");

var calendarDays = document.querySelectorAll(".dateNumber");
var calendarWeek = document.querySelectorAll(".itsTheDays");

var isDarkActive = true;

function setDarkMode () {
    console.log(calendarDays);
    if (isDarkActive) {
        for ( i = 0; i < calendarDays.length; i++) {
            calendarDays[i].classList.add("calendarDaysDark");
        };
        html.classList.add('darkMode');
        header.classList.add('header');
        randomWord.classList.add('randomWordDark');
        definitionBox.classList.add('definitionBoxDark');
        weekBox.classList.add('weekBoxDark');
        day1.classList.add('day1Dark');
        day2.classList.add('day2Dark');
        day3.classList.add('day3Dark');
        day4.classList.add('day4Dark');
        day5.classList.add('day5Dark');
        day6.classList.add('day6Dark');
        day7.classList.add('day7Dark');
        holiday1.classList.add('holidayDark');
        holiday2.classList.add('holidayDark');
        holiday3.classList.add('holidayDark');
        holiday4.classList.add('holidayDark');
        holiday5.classList.add('holidayDark');
        holiday6.classList.add('holidayDark');
        holiday7.classList.add('holidayDark');
        userEvent1.classList.add('userEventDark');
        userEvent2.classList.add('userEventDark');
        userEvent3.classList.add('userEventDark');
        userEvent4.classList.add('userEventDark');
        userEvent5.classList.add('userEventDark');
        userEvent6.classList.add('userEventDark');
        userEvent7.classList.add('userEventDark');
        userClear1.classList.add('userClearDark1');
        userClear2.classList.add('userClearDark2');
        userClear3.classList.add('userClearDark1');
        userClear4.classList.add('userClearDark2');
        userClear5.classList.add('userClearDark1');
        userClear6.classList.add('userClearDark2');
        userClear7.classList.add('userClearDark1');
        userSave1.classList.add('userSaveDark1');
        userSave2.classList.add('userSaveDark2');
        userSave3.classList.add('userSaveDark1');
        userSave4.classList.add('userSaveDark2');
        userSave5.classList.add('userSaveDark1');
        userSave6.classList.add('userSaveDark2');
        userSave7.classList.add('userSaveDark1');
        calendarDark.classList.add('calendarDark');
    } else {
        for ( i = 0; i < calendarDays.length; i++) {
            calendarDays[i].classList.remove("calendarDaysDark");
        }
        html.classList.remove("darkMode");
        header.classList.remove('header');
        randomWord.classList.remove('randomWordDark');
        definitionBox.classList.remove('definitionBoxDark');
        weekBox.classList.remove('weekBoxDark');
        day1.classList.remove('day1Dark');
        day2.classList.remove('day2Dark');
        day3.classList.remove('day3Dark');
        day4.classList.remove('day4Dark');
        day5.classList.remove('day5Dark');
        day6.classList.remove('day6Dark');
        day7.classList.remove('day7Dark');
        holiday1.classList.remove('holidayDark');
        holiday2.classList.remove('holidayDark');
        holiday3.classList.remove('holidayDark');
        holiday4.classList.remove('holidayDark');
        holiday5.classList.remove('holidayDark');
        holiday6.classList.remove('holidayDark');
        holiday7.classList.remove('holidayDark');
        userEvent1.classList.remove('userEventDark');
        userEvent2.classList.remove('userEventDark');
        userEvent3.classList.remove('userEventDark');
        userEvent4.classList.remove('userEventDark');
        userEvent5.classList.remove('userEventDark');
        userEvent6.classList.remove('userEventDark');
        userEvent7.classList.remove('userEventDark');
        userClear1.classList.remove('userClearDark1');
        userClear2.classList.remove('userClearDark2');
        userClear3.classList.remove('userClearDark1');
        userClear4.classList.remove('userClearDark2');
        userClear5.classList.remove('userClearDark1');
        userClear6.classList.remove('userClearDark2');
        userClear7.classList.remove('userClearDark1');
        userSave1.classList.remove('userSaveDark1');
        userSave2.classList.remove('userSaveDark2');
        userSave3.classList.remove('userSaveDark1');
        userSave4.classList.remove('userSaveDark2');
        userSave5.classList.remove('userSaveDark1');
        userSave6.classList.remove('userSaveDark2');
        userSave7.classList.remove('userSaveDark1');
        calendarDark.classList.remove('calendarDark');
    }
    isDarkActive = !isDarkActive;
}

toggleButton.addEventListener("click", setDarkMode);


// function showCalendar(event) {
//     if (isVisible) {
//         mobileBlackout.classList.add('mobilehide');
//         calendarMobile.classList.remove('hideit');
//     } else {
//         mobileBlackout.classList.remove('mobilehide');
//         calendarMobile.classList.add('hideit');
//     }
//     isVisible = !isVisible;
// };