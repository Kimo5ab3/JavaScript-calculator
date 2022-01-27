"use strict";
//save the variables with the elements of the document.
var numbers = document.querySelectorAll('.numbers div');
var input = document.getElementById('input');
var operators = document.querySelectorAll('.operators div');
var clear = document.getElementById('clear');
var equal = document.getElementById('equal');

//I create a cycle for each number and with a function I insert it in the calculation space.
for(var i = 0; i < numbers.length; i++){
  numbers[i].addEventListener('click', function(e) {
    input.innerHTML += e.target.innerHTML;
  });
}
//I also do a cycle for the operators
for(var i = 0; i < operators.length; i++){
  operators[i].addEventListener('click', function(e) {
    var stringInput = input.innerHTML;
    var lastChar = stringInput[stringInput.length-1];
//if I select an operator before a number, it does not enter the calculation space unless it is "-" to calculate a negative number.
    if(e.target.innerHTML !== "-" && stringInput === "" || stringInput === "-"){
      input.innerHTML += "";
//if I'm wrong operator I can click on the correct. I used the slice() function.
    }else if(stringInput !== "" && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
      input.innerHTML = stringInput.slice(0,-1) + e.target.innerHTML;
    }else{
      input.innerHTML += e.target.innerHTML; 
    }
  });
}

equal.addEventListener('click',function(){

  function onlyCorrect(correct){
    return correct !== "";
  }
//I create an array to insert the digits to calculate
  var numbersArr = [];
//extract from the calculation space with regular expressions the numbers to be inserted in the array and filter the result to eliminate any empty spaces.
  numbersArr.push(input.innerHTML.split(/\+|\-|\×|\÷/));
  var nrFilt = numbersArr[0].filter(onlyCorrect);
  console.log(nrFilt);
//I do the same thing for an array dedicated to operators
  var operatorsArr = [];
  operatorsArr.push(input.innerHTML.split(/[0-9]|\./));
  var opFilt = operatorsArr[0].filter(onlyCorrect);
  console.log(opFilt);
//I check and reassemble any initial negative number.
  if(nrFilt.length === opFilt.length ){
    var tot = opFilt[0].concat(nrFilt[0]);
    nrFilt[0] = tot;
    opFilt.splice(0,1);
    console.log(nrFilt);
    console.log(opFilt);
  }
//With while loops I first perform divisions and multiplications and then additions and subtractions.
//Thanks to .splice() (that I had the chance to study to develop the calculator) I can substitute, in the exact point of the array where the calculated numbers are, their result.
  while(opFilt.includes("÷")){
    var index = opFilt.indexOf("÷");
    nrFilt.splice(index, 2, nrFilt[index] / nrFilt[index + 1]);
    opFilt.splice(index,1);
  }

  while(opFilt.includes("×")){
    var index = opFilt.indexOf("×");
    nrFilt.splice(index, 2, nrFilt[index] * nrFilt[index + 1]);
    opFilt.splice(index,1);
  }

  while(opFilt.includes("-")){
    var index = opFilt.indexOf("-");
    nrFilt.splice(index, 2, nrFilt[index] - nrFilt[index + 1]);
    opFilt.splice(index,1);
  }

  while(opFilt.includes("+")){
    var index = opFilt.indexOf("+");
    nrFilt.splice(index, 2,parseFloat(nrFilt[index]) + parseFloat(nrFilt[index+1]));
    opFilt.splice(index,1);
  }
//I send the result on screen.
  input.innerHTML = nrFilt[0];
  console.log(nrFilt[0]);
  console.log("-----GOOD CALCULATE!!!-----")
});
//Function for clear the calculation space with the "C" button.
clear.addEventListener('click',function(){
  input.innerHTML = "";
});




