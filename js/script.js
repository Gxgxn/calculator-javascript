const num = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".current");
const prevDisplay = document.querySelector(".prev");
const equalBtn = document.querySelector(".equals");
const opp = document.querySelector("#opp");
const clearAll = document.querySelector(".clear-all");
const back = document.querySelector(".clear-back");

//probably dont need all these
//apart from the currentOperator, might remove later
//definately a bit of repition
let prevNumber = "";
let currentNumber = "";
let isFloat = false;
let result = null;
let currentOperator = "";
num.forEach((numbtn) => {
  numbtn.addEventListener("click", () => {
    if (numbtn.innerText == ".") {
      //prevents multiple decimals
      if (display.innerText.includes(".")) return;
      else {
        display.innerText += numbtn.innerText;
        isFloat = true;
      }
      return;
    }
    display.innerText += numbtn.innerText;
  });
});

//operator logic
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    currentOperator = opp.innerText = operator.innerText;

    if (prevNumber == "") {
      prevNumber = prevDisplay.innerText = display.innerText;
      display.innerText = "";
    } else {
      //checks if display value is null
      if (display.innerText === "") {
        return;
      }
      currentNumber = display.innerText;
      result = calculate(operator.innerText, prevNumber, currentNumber);
      if (`${result}`.match(/[.]/g)) {
        res = parseFloat(res.toFixed(3));
      }
      prevNumber = result;
      prevDisplay.innerText = result;
      display.innerText = "";
    }
  });
});

// calculate function
function calculate(operator, prevN, currentN) {
  switch (operator) {
    case "x":
      return parseFloat(prevN) * parseFloat(currentN);
    case "+":
      return parseFloat(prevN) + parseFloat(currentN);
    case "-":
      return parseFloat(prevN) - parseFloat(currentN);
    case "/":
      //checks for divide by zero
      if (currentN == 0) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        alert("You know the rules so do i...");
        return "";
      }
      return parseFloat(prevN) / parseFloat(currentN);
    case "%":
      return parseFloat(prevN) % parseFloat(currentN);
  }
}

//equal Btn logic
equalBtn.addEventListener("click", () => {
  console.log = "";
  if (
    display.innerText !== "" &&
    prevDisplay.innerText !== "" &&
    currentOperator !== ""
  ) {
    let res = calculate(
      currentOperator,
      prevDisplay.innerText,
      display.innerText
    );
    if (`${res}`.match(/[.]/g)) {
      res = parseFloat(res.toFixed(3));
    }
    display.innerText = res;
    reset();
  }
  //this checks if user pressed equals without entering a current number
  // display the previous number the calculated value
  else if (
    display.innerText === "" &&
    prevDisplay.innerText !== "" &&
    currentOperator !== ""
  ) {
    display.innerText = prevDisplay.innerText;
    reset();
  }
});

function reset() {
  prevDisplay.innerText = "";
  opp.innerText = "";
  currentOperator = "";
  prevNumber = "";
  currentNumber = "";
  isFloat = false;
  result = null;
  currentOperator = "";
}

// Clear all
clearAll.addEventListener("click", () => {
  display.innerText = "";
  reset();
});

//backspace
back.addEventListener("click", () => {
  let outText = display.innerText.split("");
  outText.pop();
  display.innerText = outText.join("");
});
