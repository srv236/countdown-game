//power set combination- for each- permute- for each try all maths combination- check results- repeat;;



"use strict";


//global variables for this file
var numOfSolutions = 0;
var solutions = [];
var target = 0;
var clicked = 0;

//DOM variables
var selectedNumbers = [];
var showAnswerBtn = document.getElementById("showAnswerBtn");
var anstxt = document.getElementById("anstxt");
var continueBtn = document.getElementById("continueBtn");
var targettxt = document.getElementById("targettxt");


//inserts stringInsert into stringSuper at the offset of stringSuper, and returns new string
function insertAt(stringSuper, offset, stringInsert) {
    let StringSuper = stringSuper.substr(0, offset) + stringInsert + stringSuper.substr(offset);
    return StringSuper;
}


//returns cloned array
function clone(array) {
    let arrayClone = array;
    return arrayClone;
}

//swaps two elements in an array
function swap(array, indexA, indexB) {
    let temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
}


function solve(numbers, targetLocal) {

    if (clicked === 0) {

        //reset all global variables back to 0
        let check = [numbers.length];
        numOfSolutions = 0;
        solutions = [];
        target = targetLocal;
        powerset(numbers, check);
    }

    //reset clicked back to 0
    if (clicked == solutions.length)    {
        clicked = 0;
    }

    if (solutions.length === 0) {
        return "no perfect solutions";
    }

    else {
        let sol = "";
        sol = solutions[clicked];
        sol += " = " + target;
        return sol;
    }

}

//find all powersets
function powerset(numbers, check) {

    for (let pscount = 0; pscount < Math.pow(2, numbers.length); pscount++) {
        let length = 0;
        for (let i = 0; i < numbers.length; i++) {
            if (check[i]) {
                length++;
            }
        }

        let set = [length]; //2^n combinations
        let fill = 0;

        for (let i = 0; i < numbers.length; i++) {
            if (check[i]) {
                set[fill] = numbers[i];
                fill++;
            }
        }

        if (set.length > 0) {
            permute(set, 0); //permute a set
        }

        let i = numbers.length - 1;
        while (i >= 0 && check[i]) {
            check[i] = false;
            i--;
        }

        if (i >= 0) {
            check[i] = true; 
        }

    }

}


function permute(numbers, i) {
    if (i == numbers.length) {
        let operators = [numbers.length - 1];
        make(numbers, operators, 0); 
    } else {
        for (let m = i; m < numbers.length; m++) {
            swap(numbers, m, i);
            let numbersClone = clone(numbers);
            permute(numbersClone, i + 1);
        }
    }
}

//combine math operators and a permutation of numbers
function make(numbers, operators, fill) {
    if (fill == numbers.length) {
        let result = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            switch (operators[i - 1]) {
                case 1:
                    result = Number(result) + Number(numbers[i]); //cast as number
                    break;
                case 2:
                    result = result - numbers[i];
                    break;
                case 3:
                    result = result * numbers[i];
                    break;
                case 4:
                    if (result % numbers[i] !== 0) {
                        return;
                    }
                    result = result / numbers[i];
                    break;
            }
        }

        // if result == target then store it in
        if (result == target) {
            solutions[numOfSolutions] = "";
            let finalOP = 0;
            for (let i = 0; i < numbers.length - 1; i++) {
                solutions[numOfSolutions] += numbers[i];
                if (finalOP !== 0 && operators[i] >= 3 && finalOP <= 2) {
                    solutions[numOfSolutions] += ")";
                    solutions[numOfSolutions] = insertAt(solutions[numOfSolutions], 0, "(");
                }
                finalOP = operators[i];
                switch (operators[i]) {
                    case 1:
                        solutions[numOfSolutions] += "+";
                        break;
                    case 2:
                        solutions[numOfSolutions] += "-";
                        break;
                    case 3:
                        solutions[numOfSolutions] += "*";
                        break;
                    case 4:
                        solutions[numOfSolutions] += "/";
                        break;
                }
            }
            solutions[numOfSolutions] = solutions[numOfSolutions] + numbers[numbers.length - 1];
            numOfSolutions++;
        }
    } else {
        if (fill === 0) {
            make(numbers, operators, ++fill);
        } else { //search all subtrees
            let nextFill = fill + 1;
            let prevFill = fill - 1;
            operators[prevFill] = 1;
            make(numbers, operators, nextFill);
            operators[prevFill] = 2;
            make(numbers, operators, nextFill);
            operators[prevFill] = 3;
            make(numbers, operators, nextFill);
            operators[prevFill] = 4;
            make(numbers, operators, nextFill);
        }
    }
}

function addAnswer() {
    for (let i = 1; i <= 6; i++) {
        selectedNumbers[i - 1] = document.getElementById("n" + i + "txt").value;
    }

    target = targettxt.value;

    anstxt.value = solve(selectedNumbers, target);
    clicked++;
}

//event listeners

showAnswerBtn.addEventListener("click", addAnswer);

continueBtn.addEventListener("click", function()    {
    clicked = 0;
});
