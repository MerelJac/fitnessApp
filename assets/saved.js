const savedWorkout = JSON.parse(localStorage.getItem("workout"));
const randomSavedWorkout = JSON.parse(localStorage.getItem('randomWorkout'));



var setInfoArray = [];

if (savedWorkout) {
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
} else {
    var printWorkout = document.createElement('div');
    printWorkout.classList.add('printedWorkout');
    document.body.appendChild(printWorkout); // Append the div to the document body 
    printWorkout.innerHTML += `<p>None Saved.</p>`
};

if (randomSavedWorkout) {
  var printWorkout = document.createElement('div');
  printWorkout.classList.add('printedWorkout');
  document.body.appendChild(printWorkout);
  var thisWorkout = document.createElement('h2');
  printWorkout.appendChild(thisWorkout);
  thisWorkout.innerHTML += randomSavedWorkout[0];
for (var i = 0; i < randomSavedWorkout[1].length; i++) {
  var exercise = randomSavedWorkout[1][i];
  printWorkout.innerHTML += `<h4 class="savedTitle">${exercise}</h4>`
} 
} else {
  var printWorkout = document.createElement('div');
  printWorkout.classList.add('printedWorkout');
  document.body.appendChild(printWorkout); // Append the div to the document body 
  printWorkout.innerHTML += `<p>None Saved.</p>`
};