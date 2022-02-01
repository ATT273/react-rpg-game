import enemiesData from './data/enemies';
import itemsData from './data/items';
import classesData from './data/classes';

export const classes = { ...classesData };
export const enemies = [...enemiesData];
export const items = [...itemsData];

export const events = [
    { id: 0, name: 'Battle' },
    { id: 1, name: 'Loot' },
    // { id: 2, name: 'Shop' },
]