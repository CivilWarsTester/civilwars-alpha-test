import { showNotification } from './notification.js';

const releaseModal = document.getElementById('releaseModal');
const releaseModal2 = document.getElementById('releaseModal2');
const closeRMButton = document.getElementById('closeRM-button');
const closeRMButton2 = document.getElementById('closeRM2-button');

document.getElementById('releaseModalP').addEventListener('click', () => releaseModal.style.display = 'block');
closeRMButton.addEventListener('click', () => releaseModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if(e.target === releaseModal) releaseModal.style.display = 'none';
});

document.getElementById('releaseModalP2').addEventListener('click', () => releaseModal2.style.display = 'block');
closeRMButton2.addEventListener('click', () => releaseModal2.style.display = 'none');
window.addEventListener('click', (e) => {
    if(e.target === releaseModal2) releaseModal2.style.display = 'none';
});

let timerElement = document.getElementById('timeUntil');

function updateTimeandDate() {
    const now = new Date();

    if(timerElement) return;
    else showNotification('Timer element is not found', 'Error', 5000);
}

function updateCountdown() {
    const releaseDate = new Date('2025-02-15T20:00:00');
    const now = new Date();
    const timeDifference = releaseDate - now;

    if(timeDifference <= 0) {
        timerElement.textContent = 'Update v1.1.2 is on the way!';
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    timerElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

setInterval(updateTimeandDate, 1000);
const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();
updateTimeandDate();