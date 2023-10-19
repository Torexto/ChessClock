const changeBtn1 = document.querySelector("#changeBtn1");
const changeBtn2 = document.querySelector("#changeBtn2");

const timer1 = document.querySelector("#timer1");
const timer2 = document.querySelector("#timer2");

const counter1 = document.querySelector("#counter1");
const counter2 = document.querySelector("#counter2");

const timerSett1 = document.querySelector("#timerSett1");
const timerSett2 = document.querySelector("#timerSett2");

const resetBtn = document.querySelector("#reset");
const pauseBtn = document.querySelector("#pause");
const settingsBtn = document.querySelector("#settings");

let turn = 0;
let defTime = 600;

function isActive(object) {
    return object.classList.contains("active");
}

function reset() {
    pause();
    counter1.innerHTML = 0;
    counter2.innerHTML = 0;
    timer1.innerHTML = formatTime(defTime);
    timer2.innerHTML = formatTime(defTime);
}

function pause() {
    turn = 0;
    changeBtn1.classList.remove("active");
    changeBtn2.classList.remove("active");
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemainder.toString().padStart(2, '0')}`;
}

function unFormatTime(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

function updateTimers() {
    if (turn === 1) {
        timer2.innerHTML = formatTime(unFormatTime(timer2.innerHTML) - 1);        
    } else if (turn === 2) {
        timer1.innerHTML = formatTime(unFormatTime(timer1.innerHTML) - 1);        
    }
    setTimeout(updateTimers, 1000);
}

setTimeout(updateTimers, 1000);

changeBtn1.addEventListener("click", () => {
    turn = 1;
    if (isActive(changeBtn1)) counter1.innerHTML = parseInt(counter1.innerHTML) + 1;
    changeBtn2.classList.add("active");
    changeBtn1.classList.remove("active");
});

changeBtn2.addEventListener("click", () => {
    turn = 2;
    if (isActive(changeBtn2)) counter2.innerHTML = parseInt(counter2.innerHTML) + 1;
    changeBtn1.classList.add("active");
    changeBtn2.classList.remove("active");
});

timerSett1.addEventListener("click", () => {
    var time = parseInt(unFormatTime(prompt("Set time (minutes:seconds)")));
    if (!isNaN(time)) {
        timer1.innerHTML = formatTime(time);
        setTimeout(pause, 1);
    }
});

timerSett2.addEventListener("click", () => {
    var time = parseInt(unFormatTime(prompt("Set time (minutes:seconds)")));
    if (!isNaN(time)) {
        timer2.innerHTML = formatTime(time);
        setTimeout(pause, 1);
    }
});

pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
settingsBtn.addEventListener("click", () => {
    var time = parseInt(unFormatTime(prompt("Set time (minutes:seconds)")));
    if (!isNaN(time)) {
        defTime = time;
        reset();
    }
});

reset();