import enemiesData from './data/enemies';

import knight from './images/classes/knight.jpg'
import warrior from './images/classes/warrior.jpg'
import assassin from './images/classes/assassin.jpg'

import RustySword from './images/items/Rusty_sword.png'
import WoodenShield from './images/items/wood_shield.png'
import LeatherBoots from './images/items/Leather_boot.png'
import IronShield from './images/items/Iron_Shield.png'

export const classes = {
    knight: {
        key: 'knight',
        name: 'Knight',
        image: knight,
    },
    warrior: {
        key: 'warrior',
        name: 'Warrior',
        image: warrior
    },
    assassin: {
        key: 'assassin',
        name: 'Assassin',
        image: assassin
    }
}
export const enemies = [...enemiesData];
export const items = [
    {
        id: 0,
        image: RustySword,
        key: 'rusty_sword',
        name: 'Rusty Sword',
        type: 'sword',
        price: 100,
        stats: {
            atk: 1,
        }
    },
    {
        id: 1,
        image: WoodenShield,
        key: 'wooden_shield',
        name: 'Wooden shield',
        type: 'shield',
        price: 200,
        stats: {
            def: 3,
        }
    },
    {
        id: 2,
        image: LeatherBoots,
        key: 'leather_boots',
        name: 'Leather boots',
        type: 'boots',
        price: 200,
        stats: {
            def: 2,
            spd: 1
        }
    },
    {
        id: 3,
        image: IronShield,
        key: 'woo_shield',
        name: 'Iron shield',
        type: 'shield',
        price: 300,
        stats: {
            def: 5,
        }
    }
]

export const events = [
    { id: 0, name: 'Battle' },
    { id: 1, name: 'Loot' },
    // { id: 2, name: 'Shop' },
]