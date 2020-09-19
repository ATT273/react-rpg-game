import knight from './images/classes/knight.jpg'
import warrior from './images/classes/warrior.jpg'
import assassin from './images/classes/assassin.jpg'
import tiger from './images/enemies/tiger.png'
import orc from './images/enemies/orc.png'
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

export const events = [
    {id: 0, name: 'Battle'},
    {id: 1, name: 'Loot'},
    {id: 2, name: 'Shop'},
]