export function showNotification(message, header, duration = 5000) {
    const notification = document.getElementById('notification');
    const loadingBar = document.getElementById('loading-bar');
    const notificationHeader = document.getElementById('notification-header');
    const notificationMessage = document.getElementById('notification-message');

    if (!notification || !loadingBar || !notificationHeader || !notificationMessage) {
        console.error("Error: Notification elements not found in the DOM!");
        return;
    }

    notificationHeader.innerText = header;
    notificationMessage.innerText = message;

    notification.style.display = 'block';
    notification.style.opacity = '1';
    loadingBar.style.width = '100%';

    loadingBar.style.transition = `width ${duration / 1000}s linear`;
    setTimeout(() => loadingBar.style.width = '0%', 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, duration);
}