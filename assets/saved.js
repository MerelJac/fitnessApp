JSON.parse(localStorage.getItem('workout'));

const savedWorkout = JSON.parse(localStorage.getItem("workout"));

var printWorkout = document.createElement('div');
document.innerHTML = printWorkout;

var setInfoArray = []

window.onload = function() {
for (var i = 0; i < savedWorkout.length; i++) {
    var title = savedWorkout[i].exerciseName;
    var date = savedWorkout[i].date;
    var setInfo = savedWorkout[i].allSetInfo;
    setInfo.forEach(value => {
        setInfoArray.push(value);
    });
    printWorkout.innerHTML += `<p>${title}</p><p>${date}</p><p>${setInfoArray}</p>`
}
}