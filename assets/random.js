const addBtn = document.querySelector("#add-button");
const workoutName = document.querySelector("#name");
const modalSection = document.querySelector(".modalContent");

const exercises = ['Push-Ups', 'Sit Ups', 'Plank', 'Rear Foot Elevated Split Squats', 'Calf Raises', 'Bicep Curls', 'Single Leg Deadlifts', 'Fire Hydrants', 'Donkey Kicks', 'Tricep Extensions', 'Hip Bridges', 'Pistol Squats', 'Sumo Squats', 'Low Rows', 'High Rows', 'Straigh Arm Lat Pulls', 'Pec Fly' ];

const mainLifts = ['Chest Press', 'Incline Shoulder Press', 'Pull Up', 'Back Squats', 'Front Squats', 'Deadlifts', 'Hip Thrusts', 'Rows'];

const cardio = ['Jog', 'Stairmaster', 'Powerwalk', 'Jump Rope', 'Burpees', 'Run', 'Bike']

// for local storage
const today = dayjs();
let saveArray = [];
// update as needed 
let allAttributesArray = ['Incline', 'Decline', 'Barbell', 'Dumbbell', 'Stability Ball', 'Neutral Grip', 'Close Grip', 'Wide Grip', 'BOSU', 'Rear Foot Elevated', 'Weighted', 'Half Kneel', 'Single Arm', 'Single Leg' ];

// workout info for loops
const workoutLength = 8;
let includeWorkouts = [];
const mainLiftsLength = 2
let includeMainWorkouts = []
const cardioLength = 1;
let allIncludedExercises = [];

// global variable
var globalApplyParent;

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

    for (var p = 0; p < includeMainWorkouts; i++) {
        console.log(phrase[p]);
        let resultsArray = [];
        if (allAttributesArray.includes(phrase[p])) {
            resultsArray.push(phrase[p]);
            phrase.splice(p, 1);
        }
        var newSearchWord = phrase.join(' ');

    }


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

    const modalBtn = document.createElement('button');
    modalBtn.classList.add('modalBtn');

    const image = document.createElement('img');
    image.classList.add('modalBtn');
    image.alt = 'addAttributes';
    image.src = './assets/images/+.png';
    modalBtn.appendChild(image);

    closeTogetherDiv.appendChild(image);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const attributeP = document.createElement('p');
    attributeP.classList.add('attribute');
    attributeP.textContent = '';

    const titleH2 = document.createElement('h2');
    titleH2.id = 'mainTitle';
    titleH2.textContent = this.main;

    textDiv.appendChild(attributeP);
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


    const saveBtn = document.querySelector("#saveBtn");
    saveBtn.addEventListener("click", () => {
        // var thisAttribute = textDiv.querySelector('.attribute').textContent;
        var thisName = textDiv.querySelector('#mainTitle').textContent;
        var allSets = printRepsDiv.querySelectorAll(".savedSets");
        var allSetInfo = [];
        allSets.forEach(div => {
            allSetInfo.push(div.textContent);
        })
        var exerciseName = thisName;
        // var exerciseName = thisAttribute + ' ' + thisName;
        var date = today.format('MMM D');
        saveArray.push({exerciseName, date, allSetInfo});
        console.log(exerciseName, allSetInfo);
        localStorage.setItem("randomWorkout", JSON.stringify(saveArray));
        window.location.href = "./saved.html"
        console.log(JSON.parse(localStorage.getItem('randomWorkout')))
        });

    var allModalBtns = document.getElementsByClassName('modalBtn');
    for (var m = 0; m < allModalBtns.length; m++) {
    allModalBtns[m].addEventListener("click", function() {
        var container = this.parentNode.parentNode;
        attributeArray = [];
        modalSection.style.display = "block";
        const applyBtn = document.querySelector('#addAttributes')
        applyBtn.dataset.containerId = container.id;
        globalApplyParent = container.id;
        console.log(globalApplyParent)
    })
    }

        // Close modal button
        const closeModalBtn = document.querySelector("#closeModal");
        closeModalBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modalSection.style.display = "none";
        });
        
        const applyBtn = document.querySelector("#addAttributes")
        applyBtn.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(globalApplyParent)
            let radioInput = document.querySelectorAll(`input[type='radio']`);
            getCheckedRadioValue(globalApplyParent)
        })
// end of generateExerciseContainer()
}};

let attributeArray = [];
function getCheckedRadioValue(globalApplyParent) {
    let radioInput = document.querySelectorAll(`input[type='radio']`);    
    for (let r = 0; r < radioInput.length; r++) {
        if (radioInput[r].checked && !attributeArray.includes(radioInput[r].value)) {
            const labelElement = document.querySelector(`label[for="${radioInput[r].id}"]`);
            const labelText = labelElement.textContent;
            attributeArray.push(labelText);
            radioInput[r].checked = false;
        }
    }

    modalSection.style.display = "none";

    var containerP = document.getElementById(globalApplyParent);
    console.log(containerP);
    var p = containerP.querySelector(".attribute");
    p.style.display = "flex";
    p.textContent = attributeArray.join(', ');
    console.log(attributeArray);
    console.log(p.textContent);

}

function addItem() {
    var input = document.querySelector("input[type='text']");
    var addedExercise = input.value;
    console.log(addedExercise)
    document.querySelector("#print-here").innerHTML += `<div class="everything"><div class="exerciseContainer" id="${addedExercise}"><div id="closeTogether"><img class="modalBtn" alt="addAttributes" src="./assets/images/+.png"><div class="text"><p class="attribute"></p><h2 id="mainTitle">${addedExercise}</h2></div></div><div class="setInput"><input class="input lbs" placeholder="lbs" type="number"><input class="input reps" placeholder="reps" type="number"><img class="icon" id="newSetBtn" alt="addNewSet" src="./assets/images/refresh.png"></div></div><div class="belowForReps"></div></div>`
    // clears value
    input.value = "";
    // adds placeholder
    input.placeholder = "Add next";
    // provide inner div functions
    var modalAdded = document.getElementsByClassName('modalBtn');

    modalAdded.addEventListener("click", function() {
        var container = this.parentNode.parentNode;
        attributeArray = [];
        modalSection.style.display = "block";
        const applyBtn = document.querySelector('#addAttributes')
        applyBtn.dataset.containerId = container.id;
        globalApplyParent = container.id;
        console.log(globalApplyParent)
    })
    

        // Close modal button
        const closeModalBtn = document.querySelector("#closeModal");
        closeModalBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modalSection.style.display = "none";
        });
        
        const applyBtn = document.querySelector("#addAttributes")
        applyBtn.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(globalApplyParent)
            let radioInput = document.querySelectorAll(`input[type='radio']`);
            getCheckedRadioValue(globalApplyParent)
        })
}

buildWorkout();

allIncludedExercises.forEach((exercise) => {
    const workout1 = new Workout(exercise);
    workout1.generateExerciseContainer();
})

const homtBtn = document.querySelector('#homeBtn').addEventListener('click', () => {
    window.location.href = './index.html'
})

const saveBtnHome = document.querySelector('#saveBtn').addEventListener('click', () => {
    window.location.href = './saved.html'
})




addBtn.addEventListener('click', addItem);