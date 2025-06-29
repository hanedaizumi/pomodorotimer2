class PomodoroTimer {
    constructor() {
        this.isRunning = false;
        this.isBreak = false;
        this.timer = null;
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.remainingTime = this.workTime;
        
        this.initializeElements();
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.timeDisplay = document.getElementById('time-display');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('input', () => {
            this.workTime = parseInt(this.workTimeInput.value) * 60;
            if (!this.isRunning) this.updateDisplay();
        });
        this.breakTimeInput.addEventListener('input', () => {
            this.breakTime = parseInt(this.breakTimeInput.value) * 60;
        });
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        this.timeDisplay.textContent = this.formatTime(this.remainingTime);
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timer = setInterval(() => {
            if (this.remainingTime <= 0) {
                this.isBreak = !this.isBreak;
                this.remainingTime = this.isBreak ? this.breakTime : this.workTime;
                this.updateDisplay();
                this.playSound();
            } else {
                this.remainingTime--;
                this.updateDisplay();
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.timer);
    }

    reset() {
        this.isRunning = false;
        this.isBreak = false;
        this.remainingTime = this.workTime;
        clearInterval(this.timer);
        this.updateDisplay();
    }

    playSound() {
        const audio = new Audio('sound/alarm.mp3');
        audio.play();
    }
}

// インスタンスの作成
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
