const savedWorkout = JSON.parse(localStorage.getItem("workout"));
// const randomSavedWorkout = JSON.parse(localStorage.getItem('randomWorkout'));
const randomSavedWorkout = JSON.parse(localStorage.getItem("randomWorkout"));
const searchBtn = document.querySelector("#oneRMSearch");
const searchQuery = document.querySelector("#searchBox");


searchBtn.addEventListener("click", () => {
  var searchWord = searchQuery.value;
  var splitPhrase = searchWord.split(' ');
  var capializedWords = [];
  splitPhrase.forEach(function(word) {
          var capitalize = word.charAt(0).toUpperCase() + word.slice(1);
          capializedWords.push(capitalize);
      });
  let newSearchWord = capializedWords.join(" ")
  let localStorageSearch = JSON.parse(localStorage.getItem(newSearchWord || (" "+ newSearchWord)))
  console.log(localStorageSearch)
})


var setInfoArray = [];

if (savedWorkout && randomSavedWorkout) {

  // saved workout
  var printWorkout = document.createElement('div');
    printWorkout.classList.add('printedWorkout');
    document.body.appendChild(printWorkout);
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
    document.body.appendChild(printWorkout);
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
    document.body.appendChild(printWorkout);
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
  document.body.appendChild(printWorkout); // Append the div to the document body 
  printWorkout.innerHTML += `<p>None Saved.</p>`
};

