import knight from './images/classes/knight.jpg'
import warrior from './images/classes/warrior.jpg'
import assassin from './images/classes/assassin.jpg'

import tiger from './images/enemies/tiger.webp'
import orc from './images/enemies/orc.png'
import dragon from './images/enemies/dragon.jpg'
import Slime from './images/enemies/Slime_puddle.png'

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

export const enemies = [
    {
        type: 'com',
        key: 'tiger',
        name: 'Tiger',
        image: tiger,
        stats: {
            hp: 20,
            maxHP: 20,
            maxMP: 10,
            mp: 10,
            atk: 8,
            def: 8,
            spd: 3
        }
    },
    {
        type: 'com',
        key: 'orc',
        name: 'Orc',
        image: orc,
        stats: {
            hp: 45,
            maxHP: 45,
            mp: 10,
            maxMP: 10,
            atk: 30,
            def: 3,
            spd: 2
        }
    },
    {
        type: 'com',
        key: 'dragon',
        name: 'Dragon',
        image: dragon,
        stats: {
            hp: 100,
            mp: 30,
            maxHP: 100,
            maxMP: 30,
            atk: 50,
            def: 20,
            spd: 10
        }
    },
    {
        type: 'com',
        key: 'Slime',
        name: 'Demon Slime',
        image: Slime,
        stats: {
            hp: 10,
            mp: 10,
            maxHP: 10,
            maxMP: 10,
            atk: 5,
            def: 5,
            spd: 3
        }
    }
]

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