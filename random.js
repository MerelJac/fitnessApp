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
        var li = document.createElement("li");
        li.innerText = JSON.stringify(mainLifts[m]);
        var pickRandomMain = mainLifts[Math.floor(Math.random() * mainLifts.length)];
        if (!includeMainWorkouts.includes(pickRandomMain)) {
            includeMainWorkouts.push(pickRandomMain)
        }
    };

    // includeMainWorkouts.forEach(function (li) {
    //     document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`});

    // create workouts from EXERCISE list 
    for (var i = 0; i < workoutLength; i++) {
        // // create a li in the printed section
        // var li = document.createElement("li");
        // // the HTML text is whatever the exercise[i] is
        li.innerText = JSON.stringify(exercises[i]);
        // randomly selectes
        var pickRandom = exercises[Math.floor(Math.random() * exercises.length)];
        // won't print duplicates
        if (!includeWorkouts.includes(pickRandom)) {
            includeWorkouts.push(pickRandom)
        }

    };

    // includeWorkouts.forEach(function (li) {
    //     document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`})

    // add cardio as part of the list
    // var li = document.createElement("li");
    var pickRandomCardio = cardio[Math.floor(Math.random() * cardio.length)];
    // console.log(pickRandomCardio)
    // li.innerText = pickRandomCardio;
    
    // document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${pickRandomCardio}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

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
    printSection.prepend(wholeSectionContainer);

    // // for all attribute modal buttons
    // var allModalBtns = document.getElementsByClassName('modalBtn');
    // for (var m = 0; m < allModalBtns.length; m++) {
    // allModalBtns[m].addEventListener("click", function() {
    //     var container = this.parentNode.parentNode;
    //     console.log(container.parentNode)
    //     modalSection.style.display = "block";

    //     applyBtn.dataset.containerId = container.id;
    //     globalApplyParent = container.id;
    //     console.log(globalApplyParent)
    // })
    // }

    // image.addEventListener("click", () => {
    //     modalSection.style.display = "block";
    // });

    // // Close modal button
    // const closeModalBtn = document.querySelector("#closeModal");
    // closeModalBtn.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     modalSection.style.display = "none";
    // });
    
    // const applyBtn = document.querySelector("#addAttributes")
    // applyBtn.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     let radioInput = document.querySelectorAll(`input[type='radio']`);
    //     radioInput.checked = false;
    //     getCheckedRadioValue(globalApplyParent)
    // })

    // imageRefresh.addEventListener("click", () => {
    //     if (lbsInput.value >= 1) {
    //         const printReps = document.createElement('p');
    //         printReps.classList.add('savedSets');
    //         printReps.textContent = (lbsInput.value + 'lbs x ' + repsInput.value);
    //         // clears data to return placeholder
    //         // repsInput.value = "";
    //         // lbsInput.value = "";
    //         printRepsDiv.appendChild(printReps)
    //     } else {
    //         const printReps = document.createElement('p');
    //         printReps.classList.add('savedSets');
    //         printReps.textContent = (repsInput.value);
    //         // clears data to return placeholder
    //         // repsInput.value = "";
    //         // lbsInput.value = "";
    //         printRepsDiv.appendChild(printReps);
    // }

    // })
// end of generateExerciseContainer()
}};

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

allIncludedExercises.forEach((exercise) => {
    const workout1 = new Workout(exercise);
    workout1.generateExerciseContainer();
})
const workout1 = new Workout('Bench Press');
workout1.generateExerciseContainer();

addBtn.addEventListener('click', addItem);