

let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesContainer = document.getElementById('lap-times');

startStopButton.addEventListener('click', () => {
    if (!running) {
        timer = setInterval(runTimer, 10);
        running = true;
        startStopButton.textContent = 'Stop';
        startStopButton.style.backgroundColor = '#dc3545';
    } else {
        clearInterval(timer);
        running = false;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = '#28a745';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#28a745';
    lapTimesContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(minutes, seconds, milliseconds);
        lapTimesContainer.appendChild(lapTime);
    }
});

function runTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('minutes').textContent = formatTimeUnit(minutes);
    document.getElementById('seconds').textContent = formatTimeUnit(seconds);
    document.getElementById('milliseconds').textContent = formatTimeUnit(milliseconds);
}

function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function formatTime(min, sec, milli) {
    return `${formatTimeUnit(min)}:${formatTimeUnit(sec)}:${formatTimeUnit(milli)}`;
}
