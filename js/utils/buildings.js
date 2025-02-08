export let buildings = {
    farms: JSON.parse(localStorage.getItem('farms')) || { count: 2, farms1Level: 1, farms2Level: 1, maxCount: 7 },
    mines: JSON.parse(localStorage.getItem('mines')) || { count: 2, mines1Level: 1, mines2Level: 1, maxCount: 7 },
    houses: JSON.parse(localStorage.getItem('houses')) || { count: 2, houses1Level: 1, houses2Level: 1, maxCount: 7 },
};