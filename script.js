let secret_number;
let start_time;
let end_time;
const MAX_RECORDS = 5;
let records = [];


const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const resultMessage = document.getElementById('resultMessage');
const newNumberButton = document.getElementById('newNumberButton');
const timerElement = document.getElementById('timer');
const recordsList = document.getElementById('recordsList');


function newNumber() {
    secret_number = Math.floor(Math.random() * 100) + 1;
    guessInput.value = '';
    resultMessage.textContent = '';
    end_time = null;
    start_time = Date.now();
    updateTimer();
}

function checkGuess() {
    const guess = parseInt(guessInput.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultMessage.textContent = 'Введите целое число от 1 до 100!';
        resultMessage.style.color = '#e74c3c';
        return;
    }

    if (guess < secret_number) {
        resultMessage.textContent = 'Загаданное число больше!';
        resultMessage.style.color = '#3498db';
    } else if (guess > secret_number) {
        resultMessage.textContent = 'Загаданное число меньше!';
        resultMessage.style.color = '#3498db';
    } else {
        resultMessage.textContent = 'Поздравляем! Вы угадали!';
        resultMessage.style.color = '#2ecc71';
        newNumberButton.disabled = false;
        end_time = Date.now();
        const elapsed_time = (end_time - start_time) / 1000;
        displayRecord(elapsed_time, guess);
    }
}

function updateTimer() {
    if (!end_time) {
        const elapsed_time = (Date.now() - start_time) / 1000;
        timerElement.textContent = 'Время: ' + formatTime(elapsed_time);
        setTimeout(updateTimer, 100);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function displayRecord(elapsed_time, guess) {
    const formattedTime = formatTime(elapsed_time);
    records.push({ time: elapsed_time, formattedTime, guess });
    records.sort((a, b) => a.time - b.time);
    records = records.slice(0, MAX_RECORDS);

    recordsList.innerHTML = '';
    records.forEach((record) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Время: ${record.formattedTime}, Число: ${record.guess}`;
    recordsList.appendChild(listItem);
    });
}

checkButton.addEventListener('click', checkGuess);
newNumberButton.addEventListener('click', newNumber);

newNumber(); // Инициализация игры