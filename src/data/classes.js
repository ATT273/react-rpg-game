import knight from '../images/classes/knight.jpg';
import warrior from '../images/classes/warrior.jpg';
import assassin from '../images/classes/assassin.jpg';
import mage from '../images/classes/mage.jpg';

const classes = {
    knight: {
        key: 'knight',
        name: 'Knight',
        image: knight,
        bonuses: {
            def: 1,
        },
        skills: [
            {
                key: 'holy_strike',
                name: 'Holy Strike',
                target: 'enemy',
                cost: 10,
                effects: [
                    { stats: 'hp', value: -10 }
                ]
            },
            {
                key: 'iron_skin',
                name: 'Iron Skin',
                target: 'self',
                cost: 20,
                effects: [
                    { stats: 'def', value: 5 }
                ]
            },
            {
                key: 'holy_water',
                name: 'Holy Water',
                target: 'self',
                cost: 20,
                effects: [
                    { stats: 'def', value: 3 },
                    { stats: 'atk', value: 3 }
                ]
            }
        ]
    },
    warrior: {
        key: 'warrior',
        name: 'Warrior',
        image: warrior,
        bonuses: {
            atk: 1,
        },
        skills: [
            {
                key: 'battle_roar',
                name: 'Battle Roar',
                target: 'self',
                cost: 7,
                effects: [
                    { stats: 'atk', value: 3 }
                ]
            },
            {
                key: 'rage',
                name: 'Rage',
                target: 'self',
                cost: 10,
                effects: [
                    { stats: 'atk', value: 5 },
                    { stats: 'spd', value: 3 },
                ]
            },
            {
                key: 'second_wind',
                name: 'Second Wind',
                target: 'self',
                cost: 10,
                effects: [
                    { stats: 'hp', value: 6 }
                ]
            }
        ]
    },
    assassin: {
        key: 'assassin',
        name: 'Assassin',
        image: assassin,
        bonuses: {
            spd: 1,
        },
        skills: [
            {
                key: 'backstab',
                name: 'Backstab',
                target: 'enemy',
                cost: 15,
                effects: [
                    { stats: 'hp', value: -15 }
                ]
            },
            {
                key: 'ambus_and_assassinate',
                name: 'Ambus and assassinate',
                target: 'enemy',
                cost: 25,
                effects: [
                    { stats: 'hp', value: -25 },
                ]
            },
            {
                key: 'poision_dagger',
                name: 'Poison Dagger',
                target: 'enemy',
                cost: 10,
                effects: [
                    { stats: 'hp', value: -10 }
                ]
            }
        ]
    },
    mage: {
        key: 'mage',
        name: 'Mage',
        image: mage,
        bonuses: {
            int: 1
        },
        skills: [
            {
                key: 'fireball',
                name: 'Fireball',
                target: 'enemy',
                cost: 10,
                effects: [
                    { stats: 'hp', value: -15 }
                ]
            },
            {
                key: 'ice_shard',
                name: 'Ice shard',
                target: 'enemy',
                cost: 5,
                effects: [
                    { stats: 'hp', value: -9 },
                ]
            },
            {
                key: 'divine_light',
                name: 'Divine Light',
                target: 'self',
                cost: 5,
                effects: [
                    { stats: 'hp', value: 10 }
                ]
            }
        ]
    }
};
export default classes;