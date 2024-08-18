const display = document.getElementById("display-value");
let displayValue = "0";
let pendingValue = null;
let operator = null;

const updateDisplay = () => {
  display.innerText = displayValue;
};

const handleNumberClick = (num) => {
  if (displayValue === "0") {
    displayValue = num;
  } else {
    displayValue += num;
  }
  updateDisplay();
};

const handleOperatorClick = (op) => {
  if (operator && pendingValue) {
    pendingValue = eval(`${pendingValue} ${operator} ${displayValue}`);
    displayValue = pendingValue;
  } else {
    pendingValue = displayValue;
  }
  operator = op;
  displayValue += ` ${op} `;
  updateDisplay();
};

const handleEqualsClick = () => {
  if (pendingValue !== null && operator !== null) {
    displayValue = eval(
      `${pendingValue} ${operator} ${displayValue.split(" ").pop()}`
    ).toString();
    pendingValue = null;
    operator = null;
    updateDisplay();
  }
};

const handleDeleteClick = () => {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
  updateDisplay();
};

const handleResetClick = () => {
  displayValue = "0";
  pendingValue = null;
  operator = null;
  updateDisplay();
};

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.dataset.value;
    const action = event.target.dataset.action;

    if (value) {
      if (!isNaN(value) || value === ".") {
        handleNumberClick(value);
      } else {
        handleOperatorClick(value);
      }
    }

    if (action) {
      if (action === "delete") {
        handleDeleteClick();
      } else if (action === "reset") {
        handleResetClick();
      } else if (action === "calculate") {
        handleEqualsClick();
      }
    }
  });
});
