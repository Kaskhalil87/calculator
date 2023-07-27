const display = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //replace current display value if first value is entered
  if (awaitingNextValue) {
    display.textContent = number;
    awaitingNextValue = false;
  } else {
    //if current display value is 0, replace it, if not, add 0
    const displayValue = display.textContent;
    display.textContent = displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, dont add value
  if (awaitingNextValue) return;
  //if no decimal, add one
  if (!display.textContent.includes(".")) {
    display.textContent = `${display.textContent}.`;
  }
}

//calulate first and second values
const calulate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(display.textContent);
  //prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calulate[operatorValue](firstValue, currentValue);
    display.textContent = calculation;
    firstValue = calculation;
  }
  //ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// add event listeners for numbers, operators, and decimals

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

//reset all display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  display.textContent = "0";
}

//event listener
clearBtn.addEventListener("click", resetAll);
