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

searchSubmitBtn.addEventListener("click", () => {
    resultsArray = [];
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
            console.log(resultsArray)
            phrase.splice(w, 1);
        }
        var newSearchWord = phrase.join(' ');
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

    const repsDiv = document.createElement('div');
    repsDiv.classList.add('labeling');
    repsDiv.id = 'reps';

    const repsInput = document.createElement('input');
    repsInput.classList.add('input', 'reps');
    repsInput.type = 'number';

    const repsLabel = document.createElement('p');
    repsLabel.classList.add('smallLabel');
    repsLabel.textContent = 'reps';

    const lbsDiv = document.createElement('div');
    lbsDiv.classList.add('labeling');
    lbsDiv.id = 'lbs';

    const lbsInput = document.createElement('input');
    lbsInput.classList.add('input', 'lbs');
    lbsInput.type = 'number';

    const lbsLabel = document.createElement('p');
    lbsLabel.classList.add('smallLabel')
    lbsLabel.textContent = 'lbs';

    repsDiv.append(repsInput);
    repsDiv.append(repsLabel);

    lbsDiv.append(lbsInput);
    lbsDiv.append(lbsLabel);

    const newSetBtn = document.createElement('button');
    newSetBtn.id = 'newSetBtn';
    newSetBtn.textContent = '~';

    setInputDiv.appendChild(lbsDiv);
    setInputDiv.appendChild(repsDiv);
    setInputDiv.appendChild(newSetBtn);

    exerciseContainer.appendChild(setInputDiv);

    const printRepsDiv = document.createElement('div');
    printRepsDiv.classList.add('belowForReps');

    const wholeSectionContainer = document.createElement('div');
    wholeSectionContainer.classList.add('eveything');

    wholeSectionContainer.appendChild(exerciseContainer);
    wholeSectionContainer.appendChild(printRepsDiv);


    printSection.prepend(wholeSectionContainer);

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

    const saveBtn = document.querySelector("#saveBtn");
    saveBtn.addEventListener("click", () => {
    console.log("clicked")
    var exerciseName = attributeP.textContent + ' ' + titleH2.textContent;
    var setInfo = printRepsDiv.textContent;
    var saveObject = {
        date: "enter today's date",
        name: exerciseName,
        setInfo: setInfo,}
    JSON.stringify(localStorage.setItem('workout', saveObject));
    console.log(setInfo)
    console.log(exerciseName)
    console.log(localStorage.getItem(JSON.parse('workout')))
})
// end of generateExerciseContainer()
};

