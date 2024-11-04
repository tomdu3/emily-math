const startBtn = document.querySelector('#start');
const number1 = document.querySelector('#num1');
const number2 = document.querySelector('#num2');
const operation = document.querySelector('#operation');
const resultInput = document.querySelector('#result-input');
const checkBtn = document.querySelector('#check-btn');
const result = document.querySelector('#result');
const correctScore = document.querySelector('#correct-score');
const wrongScore = document.querySelector('#wrong-score');
const clearScoreBtn = document.querySelector('#clear-score');
checkBtn.disabled = true;
let currentResult = 0;

let scoreState = {
    correct: 0,
    wrong: 0
};

function loadScores() {
    const savedScores = localStorage.getItem('mathGameScores');
    if (savedScores) {
        scoreState = JSON.parse(savedScores);
        updateScoreDisplay();
    }
}

function saveScores() {
    localStorage.setItem('mathGameScores', JSON.stringify(scoreState));
}

function updateScoreDisplay() {
    correctScore.textContent = scoreState.correct;
    wrongScore.textContent = scoreState.wrong;
}

function clearScores() {
    scoreState.correct = 0;
    scoreState.wrong = 0;
    saveScores();
    updateScoreDisplay();
    startBtn.textContent = 'Start';
    setTimeout(() => {
        window.location.reload();
    }, 200);
}

clearScoreBtn.addEventListener('click', clearScores);

startBtn.addEventListener('click', () => {
    let selectOperation, num1, num2, res, op;
    selectOperation = Math.floor(Math.random() * 2);

    if (selectOperation == 0) {
        [num1, num2, res, op] = addTwoNumbers();
    }
    else {
        [num1, num2, res, op] = subtractTwoNumbers();
    }
    checkBtn.disabled = false;
    number1.innerHTML = num1;
    number2.innerHTML = num2;
    operation.innerHTML = op;
    result.innerHTML = res;
    currentResult = res;
    resultInput.value = '';
    resultInput.classList.remove('wrong');
    result.classList.add('hidden');

    if (startBtn.textContent === 'Start') {
        startBtn.textContent = 'Next';
    }
});

checkBtn.addEventListener('click', checkResult);
resultInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkResult();
    }
});

function checkResult() {
    // Check if input is empty or only whitespace
    if (!resultInput.value.trim()) {
        return; // Exit the function if input is empty
    }

    const userResult = parseInt(resultInput.value);
    
    if (userResult === currentResult) {
        // Correct answer
        scoreState.correct++;
        createHearts();
        resultInput.classList.add('correct');
        setTimeout(() => {
            resultInput.classList.remove('correct');
        }, 500);
    } else {
        // Wrong answer
        scoreState.wrong++;
        resultInput.classList.add('wrong');
        setTimeout(() => {
            result.classList.remove('hidden');
            result.classList.add('correct');
        }, 1000);
    }
    saveScores();
    updateScoreDisplay();
    checkBtn.disabled = true;
}


function getRandomColor() {
    const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add this CSS for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particle {
        0% {
            transform: rotate(var(--angle)) translateX(10px);
            opacity: 1;
        }
        100% {
            transform: rotate(var(--angle)) translateX(60px);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

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

function createHearts() {
    const resultInput = document.querySelector('#result-input');
    const rect = resultInput.getBoundingClientRect();
    
    // Create multiple hearts
    for (let i = 0; i < 8; i++) {
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';
        
        // Position the container around the input
        const angle = (i / 8) * 360;
        const radius = 40; // Reduced radius for tighter circle
        // Adjust x and y coordinates with offsets
        const x = rect.left + rect.width/2 + radius * Math.cos(angle * Math.PI / 180) - 30; // Move 30px left
        const y = rect.top + rect.height/2 + radius * Math.sin(angle * Math.PI / 180) - 20; // Move 20px up
        
        heartContainer.style.left = `${x}px`;
        heartContainer.style.top = `${y}px`;
        
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        
        heartContainer.appendChild(heart);
        document.body.appendChild(heartContainer);
        
        // Remove the heart after animation
        setTimeout(() => {
            document.body.removeChild(heartContainer);
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadScores();
});