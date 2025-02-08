import { GetData } from './GetData.js';
import { timers } from '../utils/timers.js';
import { buildings } from '../utils/buildings.js';
import { playerData } from '../utils/playerData.js';

const getData = new GetData();

export class Calculate {
    calculateProduction(buildingType) {
        let totalProduction = 0;

        if(!buildings[buildingType]) {
            console.error(`Building type ${buildingType} not found in buildings!`);
            return totalProduction;
        }

        for(let i = 1; i <= buildings[buildingType].count; i++) {
            const levelKey = `${buildingType}${i}Level`;
            const level = buildings[buildingType][levelKey];

            if(!level) {
                console.warn(`${levelKey} is not found!`);
                continue;
            }

            const baseProduction = getData.getProduction(buildingType, level);
            totalProduction += baseProduction;
        }

        return totalProduction;
    }

    calculatePopulation() {
        const totalHousePopulation = this.calculateProduction('houses');
        playerData.population = totalHousePopulation;
        document.getElementById('population').textContent = totalHousePopulation;
    }
}

const calc = new Calculate();

export function calculateCollectibles() {
    const now = Date.now() / 1000;
    let elapsedTime = now - timers.lastCollectionTime;
    let elapsedHours = elapsedTime / 3600;

    let farmProduction = calc.calculateProduction('farms') * elapsedHours + playerData.remainingFoodFraction;
    let mineProduction = calc.calculateProduction('mines') * elapsedHours + playerData.remainingGoldFraction;

    document.getElementById('collectible-food').textContent = `${String(farmProduction.toFixed(2)).padStart(2, '0')}`;
    document.getElementById('collectible-gold').textContent = `${String(mineProduction.toFixed(2)).padStart(2, '0')}`;
}