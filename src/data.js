import enemiesData from './data/enemies';
import itemsData from './data/items';
import knight from './images/classes/knight.jpg';
import warrior from './images/classes/warrior.jpg';
import assassin from './images/classes/assassin.jpg';



export const classes = {
    knight: {
        key: 'knight',
        name: 'Knight',
        image: knight,
        bonuses: {
            def: 1,
        }
    },
    warrior: {
        key: 'warrior',
        name: 'Warrior',
        image: warrior,
        bonuses: {
            atk: 1,
        }
    },
    assassin: {
        key: 'assassin',
        name: 'Assassin',
        image: assassin,
        bonuses: {
            spd: 1,
        }
    }
}
export const enemies = [...enemiesData];
export const items = [...itemsData];

export const events = [
    { id: 0, name: 'Battle' },
    { id: 1, name: 'Loot' },
    // { id: 2, name: 'Shop' },
]