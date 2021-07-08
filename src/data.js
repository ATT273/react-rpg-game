import knight from './images/classes/knight.jpg'
import warrior from './images/classes/warrior.jpg'
import assassin from './images/classes/assassin.jpg'

import tiger from './images/enemies/tiger.png'
import orc from './images/enemies/orc.png'

import rusty_sword from './images/items/Rusty_sword.png'
import wooden_shield from './images/items/wood_shield.png'
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

export const enemies = {
    tiger : {
        type: 'com',
        key: 'tiger',
        name: 'Tiger',
        image: tiger,
        stats: {
            hp: 10,
            mp: 10,
            atk: 3,
            def: 3,
            spd: 3
        }
    },
    orc : {
        type: 'com',
        key: 'orc',
        name: 'Orc',
        image: orc,
        stats: {
            hp: 20,
            mp: 10,
            atk: 3,
            def: 3,
            spd: 3
        }
    }
}

export const items = [
    {
        id: 0,
        image: rusty_sword,
        key: 'rusty_sword',
        name: 'Rusty Sword',
        price: 100,
        stats: {
            atk: 1,
        }
    },
    {
        id: 1,
        image: wooden_shield,
        key: 'woo_shield',
        name: 'Wooden shield',
        price: 200,
        stats: {
            def: 3,
        }
    }
]

export const events = [
    {id: 0, name: 'Battle'},
    {id: 1, name: 'Loot'},
    {id: 2, name: 'Shop'},
]