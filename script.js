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
btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.target.classList.add("click");
    setTimeout(() => this.classList.remove("click"), 120);
  })
);

let arr = [];
let num1 = arr[0];
let num2 = arr[1];
let i = 0;
let start = false;
let result;
let currSign;
let previousSign;
let previousBtn;
let currBtn;

function displayResult(e) {
  let btn = e.target.textContent;
  switch (true) {
    case isDigit(e):
      // Check if "0" is entered in a clean screen so it's not registered
      if (btn == "0" && start == false) {
        break;
      } else if (num1 == undefined) {
        num1 = [];
        currBtn = "num1";
      }

      if (previousBtn == undefined) {
        previousBtn = btn;
      }

      // Check if a digit is entred after a calculation was performed using the = sign to clear old results
      if (previousBtn == "=") {
        num1 = [];
        num2 = [];
      }

      // if (result != undefined && arr[i] == undefined) {
      //   arr[i] = [];
      // }

      if (previousBtn == currSign) {
        num2 = [];
      }
      if (currBtn == "num1") {
        num1.push(btn);
        input.value = num1.join("");
        start = true;
        break;
      } else {
        num2.push(btn);
        input.value = num2.join("");
        start = true;
        break;
      }

    case isOperator(e):
      if (start == true) {
        currSign = btn;
        if (num1 != undefined) i++;
      }
      if (previousSign == undefined) {
        previousSign = currSign;
      }
      if (currBtn == "num1") {
        currBtn = "num2";
      } else {
        currBtn = "num1";
      }
      if (i > 1) {
        if (Operator(previousBtn)) {
          i--;
          break;
        }
        num1 = +num1.join("");
        if (typeof num2 == "object") {
          num2 = +num2.join("");
        } else num2 = +num2;
        result = operate(previousSign, num1, num2);
        if (result == Infinity) {
          input.value = "Wrong number bitch";
        } else {
          input.value = result;
        }
        num1 = [`${result}`];
        currBtn = "num2";
        i = 1;
      }

      previousSign = btn;
      break;

    case isEqual(e):
      num1 = +num1.join("");
      if (typeof num2 == "object") {
        num2 = +num2.join("");
      } else num2 = +num2;
      result = operate(currSign, num1, num2);
      if (result == Infinity) {
        input.value = "Wrong number bitch";
      } else {
        input.value = result;
        num1 = [`${result}`];
        i = 0;
      }
      currBtn = "num1";
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
