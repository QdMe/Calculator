let num1 = 0;
let num2 = 0;
let operator;
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      "sike, that's the wrong number!";
  }
}
const input = document.querySelector("#display");
const btns = document.querySelectorAll("button");

btns.forEach((btn) => btn.addEventListener("click", displayResult));
let arr1 = [];
let arr2 = [];

let sign;
let result;
function displayResult(e) {
  // Get num1
  if (!isOperator(e) && !isdelOrEqualOrC(e) && sign == undefined) {
    arr1.push(e.target.textContent);
    num1 = input.value = arr1.join("");
  } else if (isOperator(e) && !isdelOrEqualOrC(e)) {
    // Get Operation
    sign = e.target.textContent;
  } else {
    // Get num2
    if (!isOperator(e) && !isdelOrEqualOrC(e)) {
      arr2.push(e.target.textContent);
      if (result == undefined) {
        input.value = arr2.join("");
      }
      num2 = arr2[0];

      // Calculate result
    } else if (e.target.textContent == "=" && result == undefined) {
      result = operate(sign, +num1, +num2);
      input.value = result;
      arr2 = [];
    } else if (e.target.textContent == "=") {
      // Take this operator
      // Wait for anothr digit to be entered
      input.value = operate(sign, result, num2);
    }
  }

  // Show result after pressing a digit after a calculation was performed previousely
  // if()
}

function isOperator(e) {
  let target = e.target.textContent;
  if (target == "x" || target == "/" || target == "-" || target == "+") {
    return true;
  } else {
    return false;
  }
}
function isdelOrEqualOrC(e) {
  let target = e.target.textContent;
  if (target == "Del" || target == "=" || target == "C" || target == ".") {
    return true;
  } else {
    return false;
  }
}

// 1- press any digit
// 2- display digit
// 3- press an operator
// don't allow for another operator
// 4- press another digit
// 5- display digit
// don't allow for another operator

// 6-

// if ( "=" ) is pressed:
// calculate the result
// replace the curr screen with the result
// do not display the "=" sign
// after that
// if operator is pressed go to next
// or if a digit is pressed
// clear screen
// display digit(s)
// go to step 2

// if ( operator ) is pressed:
// disable all other operators
// calculate the perevious result
// replace the perevious screen with the result
// wait for another digit
// replace the screen with the new digit but keep the previous result
// calculate the new results with the new digit
// if "=" calculate and display
// do not display the "=" sign
// else if another opertor is pressed
// go to step 1
