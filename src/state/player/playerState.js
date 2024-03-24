import { atom } from "recoil";
import player_img from '../../images/player/player.jpg';

export const playerState = atom({
    key: 'playerData',
    default: {
        type: 'player',
        name: '',
        image: player_img,
        plClass: '',
        level: 1,
        exp: 0,
        levelExp: 0,
        stats: {
            hp: 100,
            mp: 100,
            maxHP: 100,
            maxMP: 100,
            atk: 0,
            def: 0,
            spd: 0
        },
        bonusStats: {
            maxHP: 0,
            maxMP: 0,
            atk: 0,
            def: 0,
            spd: 0
        },
        buffs: {
            atk: 0,
            def: 0,
            spd: 0
        },
        items: [],
        skills: []
    }
});


export const createCharacter = (data) => {
    return data;
};

export const updateStats = (player, stats) => {
    const newPlayerData = { ...player, stats };
    return newPlayerData
};

export const updateBonusStats = (player, bonusStats) => {
    const newPlayerData = { ...player, bonusStats };
    return newPlayerData
};

export const updateInventory = (player, inventory) => {
    const newPlayerData = { ...player, inventory };
    return newPlayerData
};

export const updatePlayer = (player, data) => {
    const newPlayerData = { ...player, ...data };
    return newPlayerData
}