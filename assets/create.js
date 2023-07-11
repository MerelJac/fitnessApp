const modalBtn = document.querySelector(".modalBtn");
const modalSection = document.querySelector(".modalContent");
const searchQuery = document.querySelector("input[type='text']");
const searchSubmitBtn = document.querySelector("#searchSubmit");
const printSection = document.querySelector("#printSection");
const exerciseContainer = document.querySelector(".exerciseContainer");

// update as needed 
var allAttributesArray = ['Incline', 'Decline', 'Barbell', 'Dumbbell', 'Stability Ball', 'Neutral Grip', 'Close Grip', 'Wide Grip', 'BOSU', 'Rear Foot Elevated', 'Weighted', 'Half Kneel', 'Single Arm', 'Single Leg' ];
var resultsArray = [];

var globalApplyParent;
var today = dayjs();

// for local storage
var saveArray = [];

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
        console.log(phrase[w]);
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
    var p = containerP.querySelector(".attribute");
    p.style.display = "flex";
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

    const image = document.createElement('img');
    image.classList.add('modalBtn');
    image.alt = 'addAttributes';
    image.src = './assets/images/+.png';

    closeTogetherDiv.appendChild(image);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const attributeP = document.createElement('p');
    attributeP.classList.add('attribute');
    attributeP.id = 'hidden';
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

    printSection.prepend(wholeSectionContainer);

    let true1RM = 0;
    let maxRepsBW = 0;
    imageRefresh.addEventListener("click", () => {
        if (lbsInput.value >= 1) {
            const printReps = document.createElement('p');
            printReps.classList.add('savedSets');
            let w = lbsInput.value;
            let r = repsInput.value;
            printReps.textContent = (w + 'lbs x ' + r);
            printRepsDiv.appendChild(printReps);
            let test1RM = w / (1.0278 - (0.0278 * r));
            if (test1RM > true1RM) {
                true1RM = test1RM;
            };


        } else {
            const printReps = document.createElement('p');
            printReps.classList.add('savedSets');
            printReps.textContent = (repsInput.value);
            printRepsDiv.appendChild(printReps);
            // makes repsInput a number not a string
            let testMaxRepsBW = parseInt(repsInput.value, 10);
            if (testMaxRepsBW > maxRepsBW) {
                maxRepsBW = testMaxRepsBW;
            };
    } 
    })

    const saveBtn = document.querySelector("#saveBtn");
    saveBtn.addEventListener("click", () => {
        var thisAttribute = textDiv.querySelector('.attribute').textContent;
        var thisName = textDiv.querySelector('#mainTitle').textContent;
        var allSets = printRepsDiv.querySelectorAll(".savedSets");
        var allSetInfo = [];
        allSets.forEach(div => {
            allSetInfo.push(div.textContent);
        })
        var exerciseName = thisAttribute + ' ' + thisName;
        if (exerciseName.charAt(0) === " ") {
            exerciseName = exerciseName.slice(1);
          }
        console.log(exerciseName)
        const date = today.format('MMM D');
        saveArray.push({exerciseName, date, allSetInfo});
        console.log(exerciseName, allSetInfo);
        let oneRMRounded =  Math.floor(true1RM);
        let maxBWrepsRounded = Math.floor(maxRepsBW);
        localStorage.setItem(exerciseName, oneRMRounded || maxBWrepsRounded);
        localStorage.setItem("workout", JSON.stringify(saveArray));
        window.location.href = "./saved.html"
        });


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

    image.addEventListener("click", () => {
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
// end of generateExerciseContainer()
};

const homeBtn = document.querySelector('#homeBtn').addEventListener('click', () => {
    window.location.href = './index.html'
})


const searchBtn = document.querySelector("#oneRMSearch");
const search1RMQuery = document.querySelector("#searchBox");
const searchBox = document.querySelector("#printSection");

const p = document.createElement('p');
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  p.id = "oneRepMaxPrinted";
  p.textContent = " ";
  var searchWord = search1RMQuery.value;
  var splitPhrase = searchWord.split(' ');
  var capializedWords = [];
  splitPhrase.forEach(function(word) {
          var capitalize = word.charAt(0).toUpperCase() + word.slice(1);
          capializedWords.push(capitalize);
      });
  let newSearchWord = capializedWords.join(" ")
  let localStorageSearch = JSON.parse(localStorage.getItem(newSearchWord));
  search1RMQuery.value = "";
  search1RMQuery.placeholder = "Exercise for 1 Rep Max";
  if (localStorageSearch == null) {
    p.textContent = "You haven't hit that lift yet!";
  } else {p.textContent = `${newSearchWord} 1RM = ${localStorageSearch}lbs. Suggested 10reps at ${Math.floor(localStorageSearch * (1.0278 - (0.0278 * 10)))}lbs, 6 reps at ${Math.floor(localStorageSearch * (1.0278 - (0.0278 * 6)))}lbs`};
  const searchFor1RM = document.querySelector("#searchFor1RM");
  searchFor1RM.insertAdjacentElement("afterend", p);
})

