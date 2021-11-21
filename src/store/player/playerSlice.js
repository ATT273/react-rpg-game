import { createSlice } from '@reduxjs/toolkit'
import player_img from '../../images/player/player.png';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: {
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
                hp: 0,
                mp: 0,
                atk: 0,
                def: 0,
                spd: 0
            },
            items: []
        },
    },
    reducers: {
        createCharacter: (state, action) => {
            state.player = action.payload;
        },
        updateStats: (state, action) => {
            const newStats = action.payload;
            state.player = { ...state.player, stats: { ...newStats } };
        },
        updateBonusStats: (state, action) => {
            const newBonusStats = action.payload;
            state.player = { ...state.player, bonusStats: { ...newBonusStats } };
        },
        updateInventory: (state, action) => {
            const newItems = action.payload;

            state.player = { ...state.player, items: [...newItems] };
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateStats, updateInventory, createCharacter, updateBonusStats } = playerSlice.actions

export default playerSlice.reducer