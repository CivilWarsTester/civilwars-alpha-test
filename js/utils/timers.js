export let timers = {
    gameTime: parseInt(localStorage.getItem('gameTime')) || 0,
    lastCollectionTime: parseInt(localStorage.getItem('lastCollectionTime')) || Date.now() / 1000
};