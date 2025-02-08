import { showNotification } from '../misc/notification.js';
import { prodRates } from '../utils/prodRates.js';
import { upgradeCosts } from '../utils/upgradeCosts.js';

export class GetData {
    getProduction = (buildingType, level) => { return prodRates[buildingType]?.[level] || 0 };
    getUpgradeCosts = (level) => { return upgradeCosts[level] || null };
    getUpgradeRequirements(level) {
        const requirements = this.getUpgradeCosts(level);
        if(!requirements || Object.keys(requirements).length === 0) {
            showNotification('No further upgrades available!', 'Warning', 5000);
            return 'No further upgrades available!';
        }

        let requirementText = 'Requires: ';
        if(requirements.food) requirementText += `Food: ${requirements.food}`;
        if(requirements.gold) requirementText += ` Gold: ${requirements.gold}`;
        if(requirements.population) requirementText += `Population: ${requirements.population}`;

        return requirementText.trim();
    }
}