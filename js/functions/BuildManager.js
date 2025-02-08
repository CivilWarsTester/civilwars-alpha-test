import { GetData } from './GetData.js';
import { buildings } from '../utils/buildings.js';
import { playerData } from '../utils/playerData.js';
import { showNotification } from '../misc/notification.js';
import { updateResources } from '../UI/updateResources.js';
import { XPCalculator } from '../functions/XPCalculator.js';
import { renderBuildingButtons } from '../UI/renderBuildingButtons.js';

const getData = new GetData();
const xpCalc = new XPCalculator();

export class BuildManager {
    buildFarm() {
        const requirements = getData.getUpgradeCosts(1);

        if (!hasSufficientResources(requirements)) {
            showNotification('Not enough resources to build a farm!', 'Insufficient material', 5000);
            return;
        }

        const farmNumber = buildings.farms.count + 1;
        const key = `farms${farmNumber}Level`;

        buildings.farms[key] = 1;
        buildings.farms.count++;

        deductResources(requirements);
        xpCalc.updatePlayerModal();
        renderBuildingButtons();
        xpCalc.getLevelFromXP();
        updateResources();
        xpCalc.grantXP(1);
    }

    buildMine() {
        const requirements = getData.getUpgradeCosts(1);

        if (!hasSufficientResources(requirements)) {
            showNotification('Not enough resources to build a mine!', 'Insufficient material', 5000);
            return;
        }

        const mineNumber = buildings.mines.count + 1;
        const key = `mines${mineNumber}Level`;

        buildings.mines[key] = 1;
        buildings.mines.count++;

        deductResources(requirements);
        xpCalc.updatePlayerModal();
        renderBuildingButtons();
        xpCalc.getLevelFromXP();
        updateResources();
        xpCalc.grantXP(1);
    }

    buildHouse() {
        const requirements = getData.getUpgradeCosts(1);

        if (!hasSufficientResources(requirements)) {
            showNotification('Not enough resources to build a house!', 'Insufficient material', 5000);
            return;
        }

        const houseNumber = buildings.houses.count + 1;
        const key = `houses${houseNumber}Level`;

        buildings.houses[key] = 1;
        buildings.houses.count++;

        deductResources(requirements);
        xpCalc.updatePlayerModal();
        renderBuildingButtons();
        xpCalc.getLevelFromXP();
        updateResources();
        xpCalc.grantXP(1);
    }
}

function hasSufficientResources(requirements) {
    return (
        playerData.food >= requirements.food &&
        playerData.gold >= requirements.gold &&
        (!requirements.population || playerData.population >= requirements.population)
    );
}

function deductResources(requirements) {
    playerData.food -= requirements.food;
    playerData.gold -= requirements.gold;
    if (requirements.population) playerData.population -= requirements.population;
}