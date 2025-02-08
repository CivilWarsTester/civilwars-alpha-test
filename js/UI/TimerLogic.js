import { timers } from '../utils/timers.js';
import { showNotification } from '../misc/notification.js';

export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if(timerElement) timerElement.textContent = formatTime(timers.gameTime);
    else showNotification('Timer element is not found!', 'Error', 5000);
}

export function gameTick() {
    timers.gameTime++;
    updateTimerDisplay();
}