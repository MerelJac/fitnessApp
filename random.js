var addBtn = document.querySelector("#add-button");
var workoutName = document.querySelector("#name");

var exercises = ['Push-Ups', 'Sit Ups', 'Plank', 'Rear Foot Elevated Split Squats', 'Calf Raises', 'Bicep Curls', 'Single Leg Deadlifts', 'Fire Hydrants', 'Donkey Kicks', 'Tricep Extensions', 'Hip Bridges', 'Pistol Squats'];

var mainLifts = ['Chest Press', 'Incline Shoulder Press', 'Pull Up', 'Back Squats', 'Front Squats', 'Deadlifts', 'Hip Thrusts'];

var cardio = ['Jog', 'Stairmaster', 'Powerwalk', 'Jump Rope', 'Burpees', 'Run', 'Bike']

const workoutLength = 8;
let includeWorkouts = [];
const mainLiftsLength = 2
let includeMainWorkouts = []
const cardioLength = 1;
let allIncludedExercises = [];


// needs script to work 
// var today = dayjs();
// $('#workout-date').text(today.format('MMM D'));

function buildWorkout() {
    // create main lifts list here
    for (var m = 0; m < mainLiftsLength; m++) {
        var pickRandomMain = mainLifts[Math.floor(Math.random() * mainLifts.length)];
        if (!includeMainWorkouts.includes(pickRandomMain)) {
            includeMainWorkouts.push(pickRandomMain)
        }
    };


    // create workouts from EXERCISE list 
    for (var i = 0; i < workoutLength; i++) {

        // randomly selectes
        var pickRandom = exercises[Math.floor(Math.random() * exercises.length)];
        // won't print duplicates
        if (!includeWorkouts.includes(pickRandom)) {
            includeWorkouts.push(pickRandom)
        }

    };

    var pickRandomCardio = cardio[Math.floor(Math.random() * cardio.length)];

    allIncludedExercises.push(...includeMainWorkouts);
    allIncludedExercises.push(...includeWorkouts);
    allIncludedExercises.push(pickRandomCardio);
    console.log(allIncludedExercises)

}

class Workout {
    constructor(newSearchWord) {
        this.main = newSearchWord;
    } 

  generateExerciseContainer() {

    const exerciseContainer = document.createElement('div');
    exerciseContainer.classList.add('exerciseContainer')
    exerciseContainer.id = this.main;

    const closeTogetherDiv = document.createElement('div');
    closeTogetherDiv.id = 'closeTogether';

    // const modalBtn = document.createElement('button');
    // modalBtn.classList.add('modalBtn');

    const image = document.createElement('img');
    image.classList.add('modalBtn');
    image.alt = 'addAttributes';
    image.src = './assets/images/+.png';
    // modalBtn.appendChild(image);

    closeTogetherDiv.appendChild(image);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    // const attributeP = document.createElement('p');
    // attributeP.classList.add('attribute');
    // attributeP.id = 'hidden';
    // attributeP.textContent = attributesToPass || '';

    const titleH2 = document.createElement('h2');
    titleH2.id = 'mainTitle';
    titleH2.textContent = this.main;

    // textDiv.appendChild(attributeP);
    textDiv.appendChild(titleH2);

    closeTogetherDiv.appendChild(textDiv);
    exerciseContainer.appendChild(closeTogetherDiv);

    const setInputDiv = document.createElement('div');
    setInputDiv.classList.add('setInput');

    const repsInput = document.createElement('input');
    repsInput.classList.add('input', 'reps');
    repsInput.placeholder = 'reps';
    repsInput.type = 'number';

    const lbsInput = document.createElement('input');
    lbsInput.classList.add('input', 'lbs');
    lbsInput.placeholder = 'lbs'
    lbsInput.type = 'number';

    // const newSetBtn = document.createElement('button');
    // newSetBtn.id = 'newSetBtn';
    const imageRefresh = document.createElement('img');
    imageRefresh.classList.add('icon');
    imageRefresh.id = 'newSetBtn';
    imageRefresh.alt = 'addNewSet';
    imageRefresh.src = './assets/images/refresh.png';


    setInputDiv.appendChild(lbsInput);
    setInputDiv.appendChild(repsInput);
    setInputDiv.appendChild(imageRefresh);

    exerciseContainer.appendChild(setInputDiv);

    const printRepsDiv = document.createElement('div');
    printRepsDiv.classList.add('belowForReps');

    const wholeSectionContainer = document.createElement('div');
    wholeSectionContainer.classList.add('everything');

    wholeSectionContainer.appendChild(exerciseContainer);
    wholeSectionContainer.appendChild(printRepsDiv);

    const printSection = document.querySelector('#print-here')
    printSection.appendChild(wholeSectionContainer);

    imageRefresh.addEventListener("click", () => {
        if (lbsInput.value >= 1) {
            const printReps = document.createElement('p');
            printReps.classList.add('savedSets');
            printReps.textContent = (lbsInput.value + 'lbs x ' + repsInput.value);
            printRepsDiv.appendChild(printReps)
        } else {
            const printReps = document.createElement('p');
            printReps.classList.add('savedSets');
            printReps.textContent = (repsInput.value);
            printRepsDiv.appendChild(printReps);}

    })
// end of generateExerciseContainer()
}};

function addItem() {
    var input = document.querySelector("input[type='text']");
    var addedExercise = input.value;
    console.log(addedExercise)
    document.querySelector("#print-here").innerHTML += `<div class="everything"><div class="exerciseContainer" id="${addedExercise}"><div id="closeTogether"><img class="modalBtn" alt="addAttributes" src="./assets/images/+.png"><div class="text"><h2 id="mainTitle">${addedExercise}</h2></div></div><div class="setInput"><input class="input lbs" placeholder="lbs" type="number"><input class="input reps" placeholder="reps" type="number"><img class="icon" id="newSetBtn" alt="addNewSet" src="./assets/images/refresh.png"></div></div><div class="belowForReps"></div></div>`
    // clears value
    input.value = "";
    // adds placeholder
    input.placeholder = "Add next";
}



buildWorkout();

allIncludedExercises.forEach((exercise) => {
    console.log(exercise)
    const workout1 = new Workout(exercise);
    workout1.generateExerciseContainer();
})
// const workout1 = new Workout('Bench Press');
// workout1.generateExerciseContainer();

addBtn.addEventListener('click', addItem);