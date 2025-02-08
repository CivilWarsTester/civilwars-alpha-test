import { prodRates } from '../utils/prodRates.js';
import { GetData } from '../functions/GetData.js';
import { BuildManager } from '../functions/BuildManager.js';
import { UpgradeManager } from '../functions/UpgradeManager.js';
import { buildings } from '../utils/buildings.js';

const getData = new GetData();
const buildManager = new BuildManager();
const upgradeManager = new UpgradeManager();

export function renderBuildingButtons() {
    const buildingActions = document.getElementById('buildingActions');
    buildingActions.innerHTML = '';

    function createButton({ text, tooltipText, onClick, isDisabled, extraStyles }) {
        const button = document.createElement('button');
        button.className = 'tooltip';
        button.textContent = text;
        button.disabled = isDisabled;

        if(onClick) button.onclick = onClick;
        if(extraStyles) for(const [key, value] of Object.entries(extraStyles)) button.style[key] = value;

        const tooltip = document.createElement('span');
        tooltip.className = 'tooltiptext';
        tooltip.textContent = tooltipText;

        button.appendChild(tooltip);
        return button;
    }

    function renderBuildingGroup(buildingType, maxCount, count, levels, upgradeFn, buildFn) {
        const groupDiv = document.createElement('div');
        groupDiv.className = `${buildingType}-section`;
        
        for(let i = 1; i <= count; i++) {
            const currentLevel = levels[`${buildingType}${i}Level`];
            const nextLevel = currentLevel + 1;

            const isMaxLevel = nextLevel > Object.keys(prodRates[buildingType]).length;
            const text = isMaxLevel
                ? `${buildingType.charAt(0).toUpperCase() + buildingType.slice(1)} ${i} (Max Level)`
                : `${buildingType.charAt(0).toUpperCase() + buildingType.slice(1)} ${i} to Level ${nextLevel}`;

            const tooltipText = isMaxLevel ? 'Max level reached' : getData.getUpgradeRequirements(nextLevel);
            const extraStyles = isMaxLevel ? { backgroundColor: 'green', color: 'black' } : {};
            const upgradeButton = createButton({
                text,
                tooltipText,
                onClick: isMaxLevel ? null : () => upgradeFn(i),
                isDisabled: isMaxLevel,
                extraStyles
            });

            groupDiv.appendChild(upgradeButton);
        }

        const buildText = `Build New ${buildingType.charAt(0).toUpperCase() + buildingType.slice(1)}`;
        const buildingTooltipText = count >= maxCount ? 'Max count reached!' : getData.getUpgradeRequirements(1);
        const extraStyles = count >= maxCount ? { backgroundColor: 'gray', color: 'black' } : {};
        const buildButton = createButton({
            text: buildText,
            tooltipText: buildingTooltipText,
            onClick: count >= maxCount ? null : buildFn,
            isDisabled: count >= maxCount,
            extraStyles
        });

        groupDiv.appendChild(buildButton);
        return groupDiv;
    }

    const farmsDivs = renderBuildingGroup('farms', buildings.farms.maxCount, buildings.farms.count, buildings.farms, upgradeManager.upgradeFarm, buildManager.buildFarm);
    const minesDivs = renderBuildingGroup('mines', buildings.mines.maxCount, buildings.mines.count, buildings.mines, upgradeManager.upgradeMine, buildManager.buildMine);
    const housesDivs = renderBuildingGroup('houses', buildings.houses.maxCount, buildings.houses.count, buildings.houses, upgradeManager.upgradeHouse, buildManager.buildHouse);

    buildingActions.appendChild(farmsDivs);
    buildingActions.appendChild(minesDivs);
    buildingActions.appendChild(housesDivs);
}