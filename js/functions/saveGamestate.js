import { timers } from '../utils/timers.js';
import { buildings } from '../utils/buildings.js';
import { playerData } from '../utils/playerData.js';

export function saveGameState() {
    localStorage.setItem('gameTime', timers.gameTime);
    localStorage.setItem('lastCollectionTime', timers.lastCollectionTime);

    localStorage.setItem('farms', JSON.stringify(buildings.farms));
    localStorage.setItem('mines', JSON.stringify(buildings.mines));
    localStorage.setItem('houses', JSON.stringify(buildings.houses));

    localStorage.setItem('playerLevel', playerData.level);
    localStorage.setItem('playerXP', playerData.xp);
    localStorage.setItem('playerFood', playerData.food);
    localStorage.setItem('playerGold', playerData.gold);
    localStorage.setItem('playerPopulation', playerData.population);
    localStorage.setItem('remainingFoodFraction', playerData.remainingFoodFraction);
    localStorage.setItem('remainingGoldFraction', playerData.remainingGoldFraction);
}