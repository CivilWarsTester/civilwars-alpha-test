import { Calculate } from './Calculate.js';
import { timers } from '../utils/timers.js';
import { playerData } from '../utils/playerData.js';
import { showNotification } from '../misc/notification.js';
import { updateResources } from '../UI/updateResources.js';

const calc = new Calculate();

export function collectResources() {
    try {
        const now = Date.now() / 1000;
        let elapsedTime = now - timers.lastCollectionTime;
        let elapsedHours = elapsedTime / 3600;

        let farmProduction = calc.calculateProduction('farms') * elapsedHours + (playerData.remainingFoodFraction);
        let farmTotal = Math.floor(farmProduction);
        let farmDecimal = farmProduction - farmTotal;

        let mineProduction = calc.calculateProduction('mines') * elapsedHours + (playerData.remainingGoldFraction);
        let mineTotal = Math.floor(mineProduction);
        let mineDecimal = mineProduction - mineTotal;

        playerData.gold += mineTotal;
        playerData.remainingGoldFraction = mineDecimal;

        playerData.food += farmTotal;
        playerData.remainingFoodFraction = farmDecimal;

        timers.lastCollectionTime = now;

        showNotification(`Collected resources: ${farmTotal} food, ${mineTotal} golds!`, 'Resource collection', 5000);
        updateResources();
    } catch(err) {
        showNotification(err.message, 'Error while collecting resources:', 5000);
    }
}