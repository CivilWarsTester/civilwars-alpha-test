export const playerData = {
    level: parseInt(localStorage.getItem('playerLevel')) || 1,
    xp: parseInt(localStorage.getItem('playerXP')) || 0,
    population: parseInt(localStorage.getItem('playerPopulation')) || 30,
    food: parseInt(localStorage.getItem('playerFood')) || 50,
    gold: parseInt(localStorage.getItem('playerGold')) || 100,
    remainingFoodFraction: parseFloat(localStorage.getItem('playerFoodFraction')) || 0,
    remainingGoldFraction: parseFloat(localStorage.getItem('playerGoldFraction')) || 0
};