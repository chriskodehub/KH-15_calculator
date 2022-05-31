// *display functionality*

// ---------- JavaScript code for settings section ----------

const switch1 = document.querySelector('#switch-1');
const switch2 = document.querySelector('#switch-2');
const switch3 = document.querySelector('#switch-3');
const bullet = document.querySelector('#bullet');

switch1.addEventListener('click', function () {
    bullet.style.marginRight = '0';
    document.body.classList.remove('theme2', 'theme3');
    document.body.classList.add('theme1');
});

switch2.addEventListener('click', function () {
    bullet.style.marginRight = '-45px';
    document.body.classList.remove('theme1', 'theme3');
    document.body.classList.add('theme2');
});

switch3.addEventListener('click', function () {
    bullet.style.marginRight = '-90px';
    document.body.classList.remove('theme2');
    document.body.classList.add('theme3');
});

// ---------- JavaScript code for display section ----------
const display = document.querySelector('.digits');
const operatorDisplay = document.querySelector('#operator');
let digitsOnDisplay = '';

function updateDisplay (number) {
    display.textContent = number;
}

// ---------- JavaScript code for keys section ----------

// event listener for the numbers and comma keys
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
    digit.addEventListener('click', function () {
        pressKey(this.textContent);
    });
});

// pressKey function
function pressKey (key) {
    // prevents entering only zeros as a first number
    if (digitsOnDisplay === '' && key === '0' && typeOfOperator === '' && calculatorCalculation === 0) {
        return;
    }
    // add 0. if dot is pressed
    else if ((digitsOnDisplay === '' || digitsOnDisplay === '0') && key === '.') {
        digitsOnDisplay = '0.';
        updateDisplay(digitsOnDisplay);
        return;
    }
    // prevent enter dwo dots
    else if ((digitsOnDisplay.search('.') !== -1 || digitsOnDisplay === '0') && key === '.') {
        return;
    }
    digitsOnDisplay += key;
    updateDisplay(digitsOnDisplay);
    operatorDisplay.textContent = '';
}

// event listener for the operators keys
const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', function () {
        doMathOperation(this.textContent);
    });
});

// doMathOperation function
function doMathOperation (operator) {
    // prevent press any operators before without specifying a number
    if (digitsOnDisplay === '' && calculatorCalculation === 0) {
        operatorDisplay.textContent = operator;
        typeOfOperator = operator;
        return;
    } else if (digitsOnDisplay === '') {
        display.textContent = '0';
        operatorDisplay.textContent = '';
        return;
    }
    calculatorCalculation = calculate();
    digitsOnDisplay = calculatorCalculation;
    operatorDisplay.textContent = operator;
    updateDisplay(digitsOnDisplay);
    typeOfOperator = operator;
    digitsOnDisplay = '';
}

// event listener for the del key
const delKey = document.querySelector('#del');
delKey.addEventListener('click', function () {
    deleteDigit();
});

// deleteDigit function
function deleteDigit () {
    if (digitsOnDisplay.length > '1') {
        digitsOnDisplay = digitsOnDisplay.slice(0, -1);
        updateDisplay(digitsOnDisplay);
    } else {
        display.textContent = '0';
        digitsOnDisplay = '';
        operatorDisplay.textContent = '';
    }
}

// event listener for the reset key
const resetKey = document.querySelector('#reset');
resetKey.addEventListener('click', function () {
    resetCalculator();
});

// resetCalculator function
function resetCalculator () {
    digitsOnDisplay = '';
    display.textContent = '0';
    calculatorCalculation = 0;
    operatorDisplay.textContent = '';
}

// event listener for the equals key
const equalsKey = document.querySelector('#equals');
equalsKey.addEventListener('click', function () {
    resultEquals();
});

// resultEquals function
function resultEquals () {
    // prevent press = before without specifying a number
    if (digitsOnDisplay === '' && calculatorCalculation === 0) {
        operatorDisplay.textContent = '=';
        return;
    }
    calculatorCalculation = calculate();
    digitsOnDisplay = calculatorCalculation;
    operatorDisplay.textContent = '=';
    updateDisplay(digitsOnDisplay);
    typeOfOperator = '';
    digitsOnDisplay = '';
    calculatorCalculation = 0;
}

// ---------- JavaScript code for calculator logic ----------

let calculatorCalculation = 0;
let typeOfOperator = '';

function calculate () {
    switch (typeOfOperator) {
        case '+':
            return add(digitsOnDisplay);
        case '-':
            return subtract(digitsOnDisplay);
        case 'x':
            return multiply(digitsOnDisplay);
        case '/':
            return divide(digitsOnDisplay);
        default:
            calculatorCalculation = parseFloat(digitsOnDisplay);
            return calculatorCalculation;
    }
}

// math functions
function add (number) {
    return calculatorCalculation + parseFloat(number);
}

function subtract (number) {
    return calculatorCalculation - parseFloat(number);
}

function multiply (number) {
    return calculatorCalculation * parseFloat(number);
}

function divide (number) {
    if (parseFloat(number) === 0) {
        return 'division by zero';
    }
    return calculatorCalculation / parseFloat(number);
}


