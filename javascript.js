/*
This program logic uses 3 primary stages:
1) A number has been entered  (number1 ===undefined)
2) A number and an operator has been entered (number1 != undefined & !ready)
3) number1, an operator, and number2 entered (ready)

These stages decide the logic of most buttons and how they will behave.
*/

let string = "0";
let number1, number2, operator, ready;
const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operation");
const operations = Array.from(operators).filter((e) => e.innerHTML != "=");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const changeSign = document.querySelector(".change-sign");
const percent = document.querySelector(".percent");

// Add event listeners to dot and number buttons
for (numberNode of numbers) {
  numberNode.addEventListener("click", (e) => {
    if ((e.target.innerHTML === ".") & string.includes(".")) return;
    if (string.length === 9) return;
    if ((string === "0") & (e.target.innerHTML != "."))
      string = e.target.innerHTML;
    else string = string + e.target.innerHTML;
    if (operator) {
      ready = true;
      operations.forEach((op) => op.classList.remove("active"));
    }
    display.innerHTML = string;
  });
}

// Add event listeners multiply divide add and subtract
for (o of operations) {
  console.log(o.innerHTML);
  o.addEventListener("click", (e) => {
    if (e.target.innerHTML === "=") return;
    if (ready) calculate();
    if (!number1) {
      number1 = parseNum(string);
      string = "0";
    }
    operations.forEach((op) => op.classList.remove("active"));
    e.target.classList.add("active");
    operator = e.target.innerHTML;
  });
}

// Add event listeners to equals
equals.addEventListener("click", (e) => {
  if (ready) calculate();
});

function calculate() {
  number2 = parseNum(string);
  if (operator === "+") string = number1 + number2;
  else if (operator === "-") string = number1 - number2;
  else if (operator === "/") string = number1 / number2;
  else if (operator === "*") string = number1 * number2;
  operations.forEach((op) => op.classList.remove("active"));

  string = string.toString();

  updateDisplay(string);
  ready = false;
  operator = null;
  number1 = null;
  number2 = null;
}

//Takes stored string and parses it as a float or int and returns
function parseNum(str) {
  if (str.includes(".")) return parseFloat(string);
  else return parseInt(string);
}

clear.addEventListener("click", () => {
  ready = false;
  operator = null;
  number1 = null;
  number2 = null;
  string = "0";
  operations.forEach((op) => op.classList.remove("active"));
  updateDisplay(string);
});

changeSign.addEventListener("click", () => {
  if (!number1) string = parseNum(string) * -1;
  else if (!ready) {
    string = number1 * -1;
    operator = null;
    operations.forEach((op) => op.classList.remove("active"));
    number1 = null;
  } else string = parseNum(string) * -1;
  string = string.toString();
  updateDisplay(string);
});

percent.addEventListener("click", () => {
  if (!number1) string = parseNum(string) / 100.0;
  else if (!ready) {
    string = number1 / 100.0;
    operator = null;
    operations.forEach((op) => op.classList.remove("active"));
    number1 = null;
  } else string = parseNum(string) / 100.0;
  string = string.toString();
  updateDisplay(string);
});

function updateDisplay(string) {
  if (string.length > 9) display.innerHTML = parseNum(string).toPrecision(4);
  else display.innerHTML = string;
}
