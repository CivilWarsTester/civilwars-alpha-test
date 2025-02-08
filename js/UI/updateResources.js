import { showNotification } from '../misc/notification.js';
import { playerData } from '../utils/playerData.js';
import { buildings } from '../utils/buildings.js';

const populationIndicator = document.getElementById('population');
const foodIndicator = document.getElementById('food');
const goldIndicator = document.getElementById('gold');
const houseCountIndicator = document.getElementById('houses');
const farmCountIndicator = document.getElementById('farms');
const mineCountIndicator = document.getElementById('mines');

export function updateResources() {
    try {
        populationIndicator.textContent = playerData.population;
        foodIndicator.textContent = playerData.food;
        goldIndicator.textContent = playerData.gold;
        farmCountIndicator.textContent = buildings.farms.count;
        mineCountIndicator.textContent = buildings.mines.count;
        houseCountIndicator.textContent = buildings.houses.count;
    } catch(err) {
        showNotification(err.message, 'Error in updateResources:', 5000);
    }
}