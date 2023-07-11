const savedWorkout = JSON.parse(localStorage.getItem("workout"));
// const randomSavedWorkout = JSON.parse(localStorage.getItem('randomWorkout'));
const randomSavedWorkout = JSON.parse(localStorage.getItem("randomWorkout"));
const searchBtn = document.querySelector("#oneRMSearch");
const searchQuery = document.querySelector("#searchBox");
const searchBox = document.querySelector("#printSection");

const p = document.createElement('p');
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  p.id = "oneRepMaxPrinted";
  p.textContent = " ";
  var searchWord = searchQuery.value;
  var splitPhrase = searchWord.split(' ');
  var capializedWords = [];
  splitPhrase.forEach(function(word) {
          var capitalize = word.charAt(0).toUpperCase() + word.slice(1);
          capializedWords.push(capitalize);
      });
  let newSearchWord = capializedWords.join(" ")
  let localStorageSearch = JSON.parse(localStorage.getItem(newSearchWord));
  searchQuery.value = "";
  searchQuery.placeholder = "Exercise for 1 Rep Max";
  if (localStorageSearch == null) {
    p.textContent = "You haven't hit that lift yet!";
  } else {p.textContent = `${newSearchWord} 1RM = ${localStorageSearch}lbs. Suggested 10reps at ${Math.floor(localStorageSearch * (1.0278 - (0.0278 * 10)))}lbs, 6 reps at ${Math.floor(localStorageSearch * (1.0278 - (0.0278 * 6)))}lbs`};
  const searchFor1RM = document.querySelector("#searchFor1RM");
  searchFor1RM.insertAdjacentElement("afterend", p);
})


var setInfoArray = [];

if (savedWorkout && randomSavedWorkout) {

  // saved workout
  var printWorkout = document.createElement('div');
    printWorkout.classList.add('printedWorkout');
    searchBox.append(printWorkout);
    var thisWorkout = document.createElement('h2');
    printWorkout.appendChild(thisWorkout);
    thisWorkout.innerHTML += savedWorkout[0].date;
  for (var i = 0; i < savedWorkout.length; i++) {
    var title = savedWorkout[i].exerciseName; // Get the title from the saved workout
    var date = savedWorkout[i].date; // Get the date from the saved workout
    var setInfo = savedWorkout[i].allSetInfo; // Get the setInfo from the saved workout
    // adds a space between print 
    var setInfoString = setInfo.map(obj => obj).join(', ');

    thisWorkout.innerHTML += `<h4 class="savedTitle">${title}</h4><p>${setInfoString}</p>`;}

    // random saved
    var printWorkout = document.createElement('div');
    printWorkout.classList.add('printedWorkout');
    searchBox.append(printWorkout);
    var thisWorkout = document.createElement('h2');
    printWorkout.appendChild(thisWorkout);
    thisWorkout.innerHTML += 'insert date';
  for (var i = 0; i < randomSavedWorkout.length; i++) {
    var exercise = randomSavedWorkout[i].exerciseName;
    printWorkout.innerHTML += `<p class="savedTitle">${exercise}<p>`
  } 

} else if (savedWorkout) {
    var printWorkout = document.createElement('div');
    printWorkout.classList.add('printedWorkout');
    searchBox.append(printWorkout);
    var thisWorkout = document.createElement('h2');
    printWorkout.appendChild(thisWorkout);
    thisWorkout.innerHTML += savedWorkout[0].date;
  for (var i = 0; i < savedWorkout.length; i++) {
    var title = savedWorkout[i].exerciseName; // Get the title from the saved workout
    var date = savedWorkout[i].date; // Get the date from the saved workout
    var setInfo = savedWorkout[i].allSetInfo; // Get the setInfo from the saved workout
    // adds a space between print 
    var setInfoString = setInfo.map(obj => obj).join(', ');

    thisWorkout.innerHTML += `<h4 class="savedTitle">${title}</h4><p>${setInfoString}</p>`;
  } 
} else if (randomSavedWorkout) {
  var printWorkout = document.createElement('div');
  printWorkout.classList.add('printedWorkout');
  document.body.appendChild(printWorkout);
  var thisWorkout = document.createElement('h2');
  printWorkout.appendChild(thisWorkout);
  thisWorkout.innerHTML += 'insert date';
for (var i = 0; i < randomSavedWorkout.length; i++) {
  var exercise = randomSavedWorkout[i].exerciseName;
  printWorkout.innerHTML += `<p class="savedTitle">${exercise}<p>`
} 
} else {
  var printWorkout = document.createElement('div');
  printWorkout.classList.add('printedWorkout');
  document.body.prepend(printWorkout); // Append the div to the document body 
  printWorkout.innerHTML += `<p>No Workouts Saved.</p>`
};

const homeBtn = document.querySelector('#homeBtnSavedPg').addEventListener('click', () => {
  window.location.href = './index.html';
})

const randomGenBtnSavedPg = document.querySelector('#randomlyGenSavedPg').addEventListener('click', () => {
  window.location.href = './random.html';
})

const createNewBtn = document.querySelector('#createNewSavedPg').addEventListener('click', () => {
  window.location.href = './create.html';
})

