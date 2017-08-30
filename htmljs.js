/*
 *  -->JS FOR HTML;;; 
 */

var LARGE_NUM = [25, 50, 75, 100]; //large numbers
var SMALL_NUM = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]; //small numbers
var selectedNum = [0, 0, 0, 0, 0, 0]; //selected numbers

var numBtnClicked = 0;
var points = 0; //points
var alert = ""; //outputs to alertLog
var ansEntered = false; //if true, no points are awarded
var bestTime = 31;



//ALL DOM VARIABLES::::::

var clock = document.getElementById("clock");
/*
    
var n1txt = document.getElementById("n1txt");
var n2txt = document.getElementById("n2txt");
var n3txt = document.getElementById("n3txt");
var n4txt = document.getElementById("n4txt");
var n5txt = document.getElementById("n5txt");
var n6txt = document.getElementById("n6txt");

*/

var targettxt = document.getElementById("targettxt");

var largeNumBtn = document.getElementById("largeNumBtn");
var smallNumBtn = document.getElementById("smallNumBtn");
var readyBtn = document.getElementById("readyBtn");
var cardOverlay = document.getElementById("card-overlay");
var anstxt = document.getElementById("anstxt");
var submitBtn = document.getElementById("submitBtn");
var pointstxt = document.getElementById("pointstxt");
var bestTimetxt = document.getElementById("bestTimetxt");
var alertLog = document.getElementById("alertLog");
var showAnswerBtn = document.getElementById("showAnswerBtn");
var continueBtn = document.getElementById("continueBtn");

//:::::::


//returns random number between n1 and n2
function getRandom(n1, n2) {
    return Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
}

//get the random number from the array
function getNumber(array) {
    let randIndx = Math.floor(Math.random() * array.length);
    let num = array.splice(randIndx, 1);
    numBtnClicked++;
    if (array.length === 0) { //if all 4 large numbers have been used up, dont display the button
        largeNumBtn.style.display = "none";
    }
    return num;
}

//add the random number to the number fields
function addNumber(num) {

    document.getElementById("n" + numBtnClicked + "txt").value = num;
    selectedNum[numBtnClicked - 1] = num;
    if (numBtnClicked == 6) {
        readyBtn.style.display = "initial";
        largeNumBtn.style.display = "none";
        smallNumBtn.style.display = "none";
    }

}

//get random target and output to target field 
function getTarget() {
    target = getRandom(100, 1000);
    targettxt.value = target;

}


//when ready is clicked
function readyBtnClicked() {
    getTarget();
    readyBtn.style.display = "none";
    submitBtn.style.display = "initial";
    showAnswerBtn.style.display = "initial";
    closeCard();
    startClock();

}

function submitBtnClicked() {

    pauseClock();

    let answerInput = anstxt.value.replace(/\s/g, "");
    let allowedChars = "";
    for (let i = 0; i < 6; i++) {
        allowedChars += selectedNum[i];
    }
    allowedChars += "\\+" + "-" + "/" + "\\*" + "\\(" + "\\)";
    let regex = new RegExp("^[" + allowedChars + "]*$");
    if (regex.test(answerInput)) {
        evaluateAnswer(answerInput);
        ansEntered = true;
        continueBtn.style.display = "initial";
    } else {
        alert = "Use only the six numbers and \+, -, /, \*";
        if (clock.ended === false && ansEntered === false) {
            clock.play();
        } else {
            clock.pause();
        }
    }
    alertLog.value = alert;
}

function getTime() {
    let time = clock.currentTime;
    if (bestTime >= time) {
        bestTime = (Math.round(time * 10) / 10);
        bestTimetxt.value = bestTime + "s";
    }
}

function evaluateAnswer(string) {
    let val = eval(string);
    let diff = Math.abs(val - target);

    if (clock.ended === false) {
        if (ansEntered === false) {
            if (diff === 0) {
                points += 10;
                alert = "Excellent answer \+ 10 points";
                getTime();
            } else if ((diff > 0) && (diff <= 5)) {
                points += 7;
                alert = "Very good answer \+ 7 points";
                getTime();
            } else if ((diff > 5) && (diff <= 10)) {
                points += 5;
                alert = "Good answer \+ 5 points";
                getTime();
            } else {
                points += 0;
                alert = "Answer too far from target. No points";
            }
        } else {
            alert = "Points already awarded, press continue for next set of numbers";
        }
    } else {

        alert = "Time over. No points";
    }
    pointstxt.value = points + "p";
    anstxt.value += " = " + val;
}

function continueBtnClicked() {

    //reset all variables

    resetClock();
    selectedNum = [0, 0, 0, 0, 0, 0];
    target = 0;
    numBtnClicked = 0;
    ansEntered = false;
    LARGE_NUM = [25, 50, 75, 100];
    SMALL_NUM = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
    alert = "";

    //reset all input fields

    targettxt.value = "";
    for (let i = 1; i <= 6; i++) {
        document.getElementById("n" + i + "txt").value = "";
    }
    anstxt.value = "";
    alertLog.value = "Displayed above are the points and the fastest time to solve a problem";


    //reset html display properties

    openCard();
    startingView();

}

//default viewwwwwwwww

function startingView() {

    largeNumBtn.style.display = "initial";
    smallNumBtn.style.display = "initial";
    readyBtn.style.display = "none";
    continueBtn.style.display = "none";
    submitBtn.style.display = "none";
    showAnswerBtn.style.display = "none";

}

function startClock() {
    clock.play();
}

function pauseClock() {
    clock.pause();
}

function resetClock() {
    clock.pause();
    clock.currentTime = 0;
}


function closeCard() {
    cardOverlay.style.height = "0%";
    anstxt.contentEditable = true;
    anstxt.style.height = "100%";
}

function openCard() {
    cardOverlay.style.height = "100%";
    anstxt.contentEditable = false;
    anstxt.style.height = "0%";
}

function showAnswerBtnClicked() {

    pauseClock();

    continueBtn.style.display = "initial";
    if (ansEntered === false) {
        alert = "No point awarded. Keep on clicking show answer to cycle through list of perfect solutions for this set";
    } else {
        alert = "Keep on clicking show answer to cycle through list of perfect solutions for this set";
    }
    ansEntered = true;
    alertLog.value = alert;
}




//EVENT LISTENERS



window.addEventListener("load", startingView);

showAnswerBtn.addEventListener("click", showAnswerBtnClicked);

largeNumBtn.addEventListener("click", function() {
    addNumber(getNumber(LARGE_NUM));
});

smallNumBtn.addEventListener("click", function() {
    addNumber(getNumber(SMALL_NUM));
});

readyBtn.addEventListener("click", readyBtnClicked);
submitBtn.addEventListener("click", submitBtnClicked);
continueBtn.addEventListener("click", continueBtnClicked);
