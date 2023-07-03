var addBtn = document.querySelector("#add-button");
var workoutName = document.querySelector("#name");

var exercises = ['Push-Ups', 'Sit Ups', 'Plank', 'Rear Foot Elevated Split Squats', 'Calf Raises', 'Bicep Curls', 'Single Leg Deadlifts', 'Fire Hydrants', 'Donkey Kicks', 'Tricep Extensions', 'Hip Bridges', 'Pistol Squats'];

var mainLifts = ['Chest Press', 'Incline Shoulder Press', 'Pull Up', 'Back Squats', 'Front Squats', 'Deadlifts', 'Hip Thrusts'];

var cardio = ['Jog', 'Stairmaster', 'Powerwalk', 'Jump Rope', 'Burpees', 'Run', 'Bike']

var workoutLength = 8;
var includeWorkouts = [];
var mainLiftsLength = 2
var includeMainWorkouts = []
var cardioLength = 1;

// needs script to work 
// var today = dayjs();
// $('#workout-date').text(today.format('MMM D'));

function buildWorkout() {
    // create main lifts list here
    for (var m = 0; m < mainLiftsLength; m++) {
        var li = document.createElement("li");
        li.innerText = JSON.stringify(mainLifts[m]);
        var pickRandomMain = mainLifts[Math.floor(Math.random() * mainLifts.length)];
        if (!includeMainWorkouts.includes(pickRandomMain)) {
            includeMainWorkouts.push(pickRandomMain)
        }
    };

    includeMainWorkouts.forEach(function (li) {
        document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`});

    // create workouts from EXERCISE list 
    for (var i = 0; i < workoutLength; i++) {
        // create a li in the printed section
        var li = document.createElement("li");
        // the HTML text is whatever the exercise[i] is
        li.innerText = JSON.stringify(exercises[i]);
        // randomly selectes
        var pickRandom = exercises[Math.floor(Math.random() * exercises.length)];
        // won't print duplicates
        if (!includeWorkouts.includes(pickRandom)) {
            includeWorkouts.push(pickRandom)
        }
    };

    includeWorkouts.forEach(function (li) {
        document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`})

    // add cardio as part of the list
    var li = document.createElement("li");
    var pickRandomCardio = cardio[Math.floor(Math.random() * cardio.length)];
    console.log(pickRandomCardio)
    li.innerText = pickRandomCardio;
    document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${pickRandomCardio}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

}

function addItem() {
    var input = document.querySelector("input");
    var addedExercise = input.value;
    document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${addedExercise}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    // clears value
    input.value = "";
    // adds placeholder
    input.placeholder = "Add next";
}


buildWorkout();
addBtn.addEventListener('click', addItem);