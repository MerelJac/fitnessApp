const modalBtn = document.querySelector(".modalBtn");
const modalSection = document.querySelector(".modalContent");
const searchQuery = document.querySelector("input[type='text']");
const searchSubmitBtn = document.querySelector("#searchSubmit");
const printSection = document.querySelector("#printSection");
const exerciseContainer = document.querySelector(".exerciseContainer");


modalBtn.addEventListener("click", () => {
    modalSection.style.display = "block";
  });

  // Close modal button
  const closeModalBtn = document.querySelector("#closeModal");
  closeModalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalSection.style.display = "none";
  });
  
  // Apply button
  const applyBtn = document.querySelector("#addAttributes");
  applyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getCheckedRadioValue();
  });


searchSubmitBtn.addEventListener("click", () => {
    var searchWord = searchQuery.value;
    generateExerciseContainer(searchWord);
    })

let attributeArray = []
function getCheckedRadioValue() {
    let radioInput = document.querySelectorAll("input[type='radio']");
    // empty the array 
    let attributeArray = []
    for (let r = 0; r < radioInput.length; r++) {
        if (radioInput[r].checked && !attributeArray.includes(radioInput[r].value)) {
            const lableElement = document.querySelector(`label[for="${radioInput[r].id}"]`);
            const labelText = lableElement.textContent;
            attributeArray.push(labelText);
            radioInput[r].checked = false;
        }
    }
    
    modalSection.style.display = "none";
    let p = document.querySelector(".attribute");
    p.textContent = attributeArray.join(', ');
}

function generateExerciseContainer(searchWord) {
    const exerciseContainer = document.createElement('div');
    exerciseContainer.classList.add('exerciseContainer')
    exerciseContainer.id = searchWord;

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
    attributeP.textContent = '';

    const titleH2 = document.createElement('h2');
    titleH2.id = 'mainTitle';
    titleH2.textContent = searchWord;

    textDiv.appendChild(attributeP);
    textDiv.appendChild(titleH2);

    closeTogetherDiv.appendChild(textDiv);
    exerciseContainer.appendChild(closeTogetherDiv);

    const setInputDiv = document.createElement('div');
    setInputDiv.classList.add('setInput');

    const repsInput = document.createElement('input');
    repsInput.classList.add('input');
    repsInput.type = 'text';
    repsInput.placeholder = 'reps';

    const lbsInput = document.createElement('input');
    lbsInput.classList.add('input');
    lbsInput.type = 'text';
    lbsInput.placeholder = 'lbs';

    const newSetBtn = document.createElement('button');
    newSetBtn.id = 'newSetBtn';
    newSetBtn.textContent = '~';

    setInputDiv.appendChild(repsInput);
    setInputDiv.appendChild(lbsInput);
    setInputDiv.appendChild(newSetBtn);

    exerciseContainer.appendChild(setInputDiv);

    printSection.prepend(exerciseContainer);

    var allModalBtns = document.getElementsByClassName('modalBtn');
    for (var m = 0; m < allModalBtns.length; m++) {
    allModalBtns[m].addEventListener("click", function() {
        var container = this.parentNode;
        var containerID = container.id;
        console.log("clicked")
        modalSection.style.display = "block";
    })
}
};


