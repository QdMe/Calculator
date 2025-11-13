let arr = [];
let num1 = arr[0];
let num2 = arr[1];
let i = 0;
let start = false;
let result;
let currSign;
let previousSign;
let previousBtn;
let currOperand;
let allowDecimal = true;
const input = document.querySelector("#display");
const btns = document.querySelectorAll("button");

// This is where the magic happens
btns.forEach((btn) => btn.addEventListener("click", displayResult));

// Give a click effect on the btns
btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.target.classList.add("click");
    setTimeout(() => this.classList.remove("click"), 120);
  })
);

function displayResult(e) {
  let btn = e.target.textContent;
  switch (true) {
    case isDigit(e) || isDecimalPoint(e):
      // Check if "0" is entered in a clean screen so it's not registered
      if (btn == "0" && start == false) {
        break;
        // Clear the first opearnd and Set the currOperand
      } else if (num1 == undefined) {
        num1 = [];
        currOperand = "num1";
      }
      // Save the previousBtn
      if (previousBtn == undefined) {
        previousBtn = btn;
      }
      // Clear old results after a calculation is performed using the = sign
      if (previousBtn == "=" && num2 != undefined) {
        num1 = [];
        num2 = [];
        currSign = undefined;
      }
      // Reset the second operand if a digit is entered right after a sign was entered
      if (previousBtn == currSign) {
        num2 = [];
      }
      // Decimal point handling
      if (isDecimalPoint(e)) {
        if (allowDecimal == true) allowDecimal = false;
        else {
          break;
        }
      }
      // Zeros in a row on an empty display handling
      if (input.value == 0 && btn == "0" && previousBtn == "0") {
        break;
      }
      // Displaying the digits depending on the value of the currOperand
      if (currOperand == "num1") {
        num1.push(btn);
        input.value = num1.join("");
      } else {
        num2.push(btn);
        input.value = num2.join("");
      }
      // To allow non digit values to be registered
      start = true;

      break;

    case isOperator(e):
      // Only register operator if start is true
      if (start == true) {
        currSign = btn; // Set current sign to the sign pressed
        if (num1 != undefined || num2 != undefined) i++;
      }
      // Initilize previous sign to be the current sign
      if (previousSign == undefined) {
        previousSign = currSign;
      }
      // Switch to the other operand after a sign is registerd only if the previous btn is not an operator
      // or not "=" sign when num2 is undefind which happens when when entering an number and then pressing and equal sign without
      // entring num2
      if (
        isAnOperator(previousBtn) ||
        (previousBtn == "=" && num2 == undefined)
      ) {
        break;
      } else {
        if (currOperand == "num1") {
          currOperand = "num2";
          allowDecimal = true;
        } else {
          currOperand = "num1";
        }
      }
      // Allow for a sequence of operations
      if (i > 1) {
        // Only register the last entered sign
        if (isAnOperator(previousBtn)) {
          i--;
          break;
        }
        // Convert num1 to int
        num1 = +num1.join("");

        // Convert num2 to int
        if (typeof num2 == "object") {
          num2 = +num2.join("");
        } else num2 = +num2;

        result = operate(previousSign, num1, num2); // call the operate function
        // Round result if it has more than 3 digits after decimal point
        if (!Number.isInteger(result)) {
          result = result.toFixed(1);
        }
        if (result == Infinity) {
          input.value = "You sneaky bastred"; // Check for division by 0
        } else {
          input.value = result; // Display the result
        }

        num1 = [`${result}`]; // Save result in num1 for later calculations
        currOperand = "num2"; // Switch back to num2 cuz we changed to num1 above
        i = 1;
      }

      previousSign = currSign; // Set previous sign to the the current sign
      break;

    case isEqual(e):
      if (
        num1 == undefined ||
        num2 == undefined ||
        num1[0] == undefined ||
        num2[0] == undefined
      ) {
        break;
      }
      // Convert num1 to int
      num1 = +num1.join("");

      // Convert num2 to int
      if (typeof num2 == "object") {
        num2 = +num2.join("");
      } else num2 = +num2;

      result = operate(currSign, num1, num2); // call the operate function

      // Round result if it has more than 3 digits after decimal point
      if (!Number.isInteger(result)) {
        result = result.toFixed(1);
      }
      if (result == Infinity) {
        input.value = "Wrong number bitch"; // Check for division by 0
      } else {
        input.value = result; // Display the result
        num1 = [`${result}`];
        i = 0;
      }
      // Switch to num1 to start in a clean slate
      if (num2 != undefined) {
        currOperand = "num1";
        allowDecimal = true;
      }
      break;
    // Clear then screen and reset all the operands
    case isClear(e):
      i = 0;
      input.value = 0;
      start = false;
      result = undefined;
      num1 = [];
      num2 = [];
      break;

    case isDel(e):
      if (currOperand == "num1" && input.value != undefined) {
        if (result != undefined) {
          num1 = num1[0].split("");
        }
        num1.pop();
        input.value = num1.join("");
      } else if (currOperand == "num2" && input.value != undefined) {
        num2.pop();
        input.value = num2.join("");
      }
  }
  previousBtn = btn; // Set the previousBtn to the current btn
}
function isDecimalPoint(e) {
  let point = ["."];
  return point.includes(e.target.textContent);
}
function isDel(e) {
  let del = ["Del"];
  return del.includes(e.target.textContent);
}
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
function isDigit(e) {
  let digit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return digit.includes(+e.target.textContent);
}
function isOperator(e) {
  let operators = ["+", "-", "/", "x"];
  return operators.includes(e.target.textContent);
}
function isEqual(e) {
  let equalSign = ["="];
  return equalSign.includes(e.target.textContent);
}
function isClear(e) {
  let C = ["C"];
  return C.includes(e.target.textContent);
}
function isAnOperator(btn) {
  let operators = ["+", "-", "/", "x"];
  return operators.includes(btn);
}
