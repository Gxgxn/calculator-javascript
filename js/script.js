let num = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let display = document.querySelector(".current");
let prevDisplay = document.querySelector(".prev");
let equalBtn = document.querySelector(".equals");

let prevNumber = "";
let currentNumber = "";
let isFloat = false;
let result = null;
num.forEach((numbtn) => {
  numbtn.addEventListener("click", () => {
    if (numbtn.innerText == ".") {
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

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (prevNumber == "") {
      prevNumber = prevDisplay.innerText = display.innerText;
      display.innerText = "";
    }
    //checks if current number is not null i.e. user clicked equals
    else if (prevNumber == "" && currentNumber !== "") {
      prevNumber = prevDisplay.innerText = display.innerText;
      display.innerText = "";
    } else {
      currentNumber = display.innerText;
      result = calculate(operator.innerText, prevNumber, currentNumber);
      prevNumber = result;
      prevDisplay.innerText = result;
      display.innerText = "";
      equalBtn.addEventListener("click", equals(result));
    }
  });
});

function calculate(operator, prevN, currentN) {
  switch (operator) {
    case "x":
      return parseFloat(prevN) * parseFloat(currentN);
    case "+":
      return parseFloat(prevN) + parseFloat(currentN);
    case "-":
      return parseFloat(prevN) - parseFloat(currentN);
    case "/":
      if (currentN == 0) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        alert("You know the rules so do i...");
      }
      return parseFloat(prevN) / parseFloat(currentN);
    case "%":
      return parseFloat(prevN) % parseFloat(currentN);
  }
}

function equals(result) {
  console.log(result);
  prevNumber = "";
  prevDisplay.innerText = "";
  currentNumber = result;
  display.innerText = currentNumber;
}
