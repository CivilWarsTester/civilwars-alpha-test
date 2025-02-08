import { GetData } from './GetData.js';
import { Calculate } from './Calculate.js';
import { buildings } from '../utils/buildings.js';
import { playerData } from '../utils/playerData.js';
import { updateResources } from '../UI/updateResources.js';
import { showNotification } from '../misc/notification.js';
import { XPCalculator } from '../functions/XPCalculator.js';
import { renderBuildingButtons } from '../UI/renderBuildingButtons.js';

const calc = new Calculate();
const getData = new GetData();
const xpCalc = new XPCalculator();

export class UpgradeManager {
    upgradeFarm(farmNumber) {
        const farmKey = `farms${farmNumber}Level`;
        const nextLevel = buildings.farms[farmKey] + 1;
        const requirements = getData.getUpgradeCosts(nextLevel);

        if(playerData.food >= requirements.food &&
           playerData.gold >= requirements.gold &&
           (!requirements.population || playerData.population >= requirements.population)) {
            playerData.food -= requirements.food;
            playerData.gold -= requirements.gold;
            if(requirements.population) playerData.population -= requirements.population;

            buildings.farms[farmKey] += 1;
            xpCalc.updatePlayerModal();
            xpCalc.grantXP(nextLevel);
            xpCalc.getLevelFromXP();
            renderBuildingButtons();
            updateResources();
        } else showNotification('Not enough resources to upgrade!', 'Insufficient material', 5000);
    }

    upgradeMine(mineNumber) {
        const mineKey = `mines${mineNumber}Level`;
        const nextLevel = buildings.mines[mineKey] + 1;
        const requirements = getData.getUpgradeCosts(nextLevel);

        if(playerData.food >= requirements.food &&
           playerData.gold >= requirements.gold &&
           (!requirements.population || playerData.population >= requirements.population)) {
            playerData.food -= requirements.food;
            playerData.gold -= requirements.gold;
            if(requirements.population) playerData.population -= requirements.population;

            buildings.mines[mineKey] += 1;
            xpCalc.updatePlayerModal();
            xpCalc.grantXP(nextLevel);
            xpCalc.getLevelFromXP();
            renderBuildingButtons();
            updateResources();
        } else showNotification('Not enough resources to upgrade!', 'Insufficient material', 5000);
    }

    upgradeHouse(houseNumber) {
        const houseKey = `houses${houseNumber}Level`;
        const nextLevel = buildings.houses[houseKey] + 1;
        const requirements = getData.getUpgradeCosts(nextLevel);

        if(playerData.food >= requirements.food &&
           playerData.gold >= requirements.gold &&
           (!requirements.population || playerData.population >= requirements.population)) {
            playerData.food -= requirements.food;
            playerData.gold -= requirements.gold;
            if(requirements.population) playerData.population -= requirements.population;

            buildings.houses[houseKey] += 1;
            xpCalc.updatePlayerModal();
            xpCalc.grantXP(nextLevel);
            xpCalc.getLevelFromXP();
            calc.calculatePopulation();
            renderBuildingButtons();
            updateResources();
        } else showNotification('Not enough resources to upgrade!', 'Insufficient material', 5000);
    }
}