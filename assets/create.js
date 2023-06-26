const modalBtn = document.querySelector(".modalBtn");
const modalSection = document.querySelector(".modalContent");
const searchQuery = document.querySelector("input[type='text']");
const searchSubmitBtn = document.querySelector("#searchSubmit");
const printSection = document.querySelector("#printSection");
const exerciseContainer = document.querySelector(".exerciseContainer");

// update as needed 
var allAttributesArray = ['Incline', 'Decline', 'Barbell', 'Dumbbell', 'Stability Ball', 'Neutral Grip', 'Close Grip', 'Wide Grip', 'BOSU' ];
var resultsArray = [];

var globalApplyParent;
var today = dayjs();

// var saveWorkout = [{name: "", setInfo: [{}]}];

searchSubmitBtn.addEventListener("click", () => {
    resultsArray = [];
    // var newWorkout = {name: "", setInfo: [{}]};
    // saveWorkout.push(newWorkout);
    var searchWord = searchQuery.value;
    var splitPhrase = searchWord.split(' ');
    var capializedWords = [];
    splitPhrase.forEach(function(word) {
            var capitalize = word.charAt(0).toUpperCase() + word.slice(1);
            capializedWords.push(capitalize);
        });

    let phrase = capializedWords;

    for (var w = phrase.length - 1; w >= 0; w--) {
        if (allAttributesArray.includes(phrase[w])) {
            resultsArray.push(phrase[w]);
            phrase.splice(w, 1);
        }
        var newSearchWord = phrase.join(' ');
        // saveWorkout[0].name = capializedWords.join(' ');
    }

    var attributesToPass = resultsArray.join(', ');
    generateExerciseContainer(newSearchWord, [attributesToPass]);
    searchQuery.value = "";
    })

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
    var p = containerP.querySelector(".attribute")
    p.textContent = attributeArray.join(', ');
    console.log(attributeArray);
    console.log(p.textContent);

}

function generateExerciseContainer(newSearchWord, attributesToPass) {
    attributeArray = [];

    const exerciseContainer = document.createElement('div');
    exerciseContainer.classList.add('exerciseContainer')
    exerciseContainer.id = newSearchWord;

    const closeTogetherDiv = document.createElement('div');
    closeTogetherDiv.id = 'closeTogether';

    const modalBtn = document.createElement('button');
    modalBtn.classList.add('modalBtn');
    modalBtn.textContent = '+';
    closeTogetherDiv.appendChild(modalBtn);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const attributeP = document.createElement('p');
    attributeP.classList.add('attribute');
    attributeP.textContent = attributesToPass || '';

    const titleH2 = document.createElement('h2');
    titleH2.id = 'mainTitle';
    titleH2.textContent = newSearchWord;

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

    const newSetBtn = document.createElement('button');
    newSetBtn.id = 'newSetBtn';
    newSetBtn.textContent = '~';

    setInputDiv.appendChild(lbsInput);
    setInputDiv.appendChild(repsInput);
    setInputDiv.appendChild(newSetBtn);

    exerciseContainer.appendChild(setInputDiv);

    const printRepsDiv = document.createElement('div');
    printRepsDiv.classList.add('belowForReps');

    const wholeSectionContainer = document.createElement('div');
    wholeSectionContainer.classList.add('eveything');

    wholeSectionContainer.appendChild(exerciseContainer);
    wholeSectionContainer.appendChild(printRepsDiv);


    printSection.prepend(wholeSectionContainer);

    var allExerciseDivs = document.querySelectorAll('.everything');
    const saveBtn = document.querySelector("#saveBtn");
    saveBtn.addEventListener("click", () => {
        console.log("hi")
        })  ;

    // for all attribute modal buttons
    var allModalBtns = document.getElementsByClassName('modalBtn');
    for (var m = 0; m < allModalBtns.length; m++) {
    allModalBtns[m].addEventListener("click", function() {
        var container = this.parentNode.parentNode;
        console.log(container.parentNode)
        modalSection.style.display = "block";

        applyBtn.dataset.containerId = container.id;
        globalApplyParent = container.id;
        console.log(globalApplyParent)
    })
    }

    modalBtn.addEventListener("click", () => {
        modalSection.style.display = "block";
    });

    // Close modal button
    const closeModalBtn = document.querySelector("#closeModal");
    closeModalBtn.addEventListener("click", (event) => {
        event.preventDefault();
        modalSection.style.display = "none";
    });
    
    const applyBtn = document.querySelector("#addAttributes")
    applyBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let radioInput = document.querySelectorAll(`input[type='radio']`);
        radioInput.checked = false;
        getCheckedRadioValue(globalApplyParent)
    })

    newSetBtn.addEventListener("click", () => {
        if (lbsInput.value >= 1) {
            const printReps = document.createElement('p');
            printReps.classList.add('savedSets');
            printReps.textContent = (lbsInput.value + 'lbs x ' + repsInput.value);

            // saveWorkout[0].setInfo.push(printReps.textContent);
            repsInput.value = "";
            lbsInput.value = "";
            printRepsDiv.appendChild(printReps)
        } else {
            const printReps = document.createElement('p');
            printReps.classList.add('savedSets');
            printReps.textContent = (repsInput.value);
            repsInput.value = "";
            lbsInput.value = "";
            printRepsDiv.appendChild(printReps)

    }

    })

    

// end of generateExerciseContainer()
};




// svaed for later maybe

    // const allExerciseDivs = document.getElementsByClassName('everything');
    // let workoutInfo = [ { name: [], set : [] } ];
    // for (var i = 0; i < allExerciseDivs.length; i++) {
    //     var divWorking = allExerciseDivs[i];
    //     var findExerciseAttribute = divWorking.querySelector('.attribute');
    //     var findExerciseName = divWorking.querySelector('#mainTitle');
    //     var exerciseName = findExerciseAttribute.textContent + ' ' + findExerciseName.textContent;
    //     var findSetInfo = divWorking.querySelector('.belowForReps');
    //     var setInfo = findSetInfo.textContent;
    //     console.log(exerciseName);
    //     console.log(setInfo);
    //     workoutInfo.name.push(exerciseName);
    //     workoutInfo.set.push(setInfo);
    //     console.log(workoutInfo);
    // } 

    // var saveObject = {
    //     date: today.format('MMM D'),
    //     name: exerciseName,
    //     setInfo: workoutInfo,}
    // localStorage.setItem('workout', JSON.stringify(saveObject));
    // console.log(setInfo)
    // console.log(exerciseName)
    // console.log(JSON.parse(localStorage.getItem('workout')))