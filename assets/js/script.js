const start = document.querySelector('#start');
const number1 = document.querySelector('#num1');
const number2 = document.querySelector('#num2');
const operation = document.querySelector('#operation');
const result = document.querySelector('#result');

start.addEventListener('click', () => {
    let selectOperation, num1, num2, res, op;
    selectOperation = Math.floor(Math.random() * 2);

    if (selectOperation == 0) {
        [num1, num2, res, op] = addTwoNumbers();
    }
    else {
        [num1, num2, res, op] = subtractTwoNumbers();
    }

    number1.innerHTML = num1;
    number2.innerHTML = num2;
    operation.innerHTML = op;
    result.innerHTML = res;    
})

function generateTwoNumbers() {
    let num1 = Math.floor(Math.random() * 99 + 1);
    let num2 = Math.floor(Math.random() * 10+1);

    return [num1, num2];
}


function addTwoNumbers() {
    let res = 0;
    let num1, num2, op;
    do {
    [num1, num2] = generateTwoNumbers();
    res = num1 + num2;
    op = "+";}
    while (res > 100);
    return [num1, num2, res, op];
}

function subtractTwoNumbers() {
    let res = 0;
    let num1, num2, op;
    do {
    [num1, num2] = generateTwoNumbers();
    res = num1 - num2;
    op = "-";}
    while (res < 0);
    return [num1, num2, res, op];
}