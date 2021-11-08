import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: {
            type: 'player',
            name: '',
            image: null,
            plClass: '',
            stats: {
                hp: 100,
                mp: 100,
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

        },
        updateStats: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        updateInventory: (state, action) => {
            state.value -= 1
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateStats, updateInventory } = playerSlice.actions

export default playerSlice.reducer