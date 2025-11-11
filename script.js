let num1 = 0;
let num2 = 0;
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

let arr = [];
let i = 0;
let start = false;
let result;
let sign;
let previousSign;
let previousBtn;
function displayResult(e) {
  let btn = e.target.textContent;
  switch (true) {
    case isDigit(e):
      if (btn == "0" && start == false) {
        break;
      } else if (arr[i] == undefined) {
        arr[i] = [];
      }

      if (previousBtn == "=") {
        arr[0] = [];
        arr[1] = [];
      }
      if (result != undefined && arr[i] == undefined) {
        arr[i] = [];
      }
      if (previousBtn == undefined) {
        previousBtn = btn;
      }
      if (previousBtn == sign) {
        arr[i] = [];
      }

      // if (i == 1 && result != undefined) {
      //   arr[i] = [];
      // }
      arr[i].push(btn);
      input.value = arr[i].join("");
      start = true;
      break;

    case isOperator(e):
      if (i >= 0 && start == true) {
        sign = btn;
        if (arr[i] != undefined) i++;
      }
      if (previousSign == undefined) {
        previousSign = sign;
      }
      if (Operator(previousBtn)) {
        i--;
        break;
      }

      if (i > 1) {
        num1 = +arr[0].join("");
        if (typeof arr[1] == "object") {
          num2 = +arr[1].join("");
        } else num2 = +arr[1];
        result = operate(previousSign, num1, num2);
        if (result == Infinity) {
          input.value = "Good shot bayaa";
        } else {
          input.value = result;
        }
        arr[0] = [`${result}`];
        i = 1;
      }
      previousSign = btn;

      break;

    case isEqual(e):
      num1 = +arr[0].join("");
      if (typeof arr[1] == "object") {
        num2 = +arr[1].join("");
      } else num2 = +arr[1];
      console.log(typeof arr[1]);
      result = operate(sign, num1, num2);
      if (result == Infinity) {
        input.value = "Good shot bayaa";
      } else {
        input.value = result;
        arr[0] = [`${result}`];
        i = 0;
      }
      break;

    case isClear(e):
      i = 0;
      input.value = 0;
      start = false;
      result = undefined;
      for (let i = 0; i < arr.length; i++) {
        arr[i] = undefined;
      }
      break;

    default:
  }
  previousBtn = btn;
}
function Operator(btn) {
  let operators = ["+", "-", "/", "x"];
  return operators.includes(btn);
}
function isDigit(e) {
  let digit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return digit.includes(+e.target.textContent);
}
function isOperator(e) {
  let target = e.target.textContent;
  if (target == "x" || target == "/" || target == "-" || target == "+") {
    return true;
  } else {
    return false;
  }
}
function isEqual(e) {
  let target = e.target.textContent;
  if (target == "=") {
    return true;
  } else {
    return false;
  }
}
function isClear(e) {
  let target = e.target.textContent;
  if (target == "C" || target == "Del" || target == ".") {
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
