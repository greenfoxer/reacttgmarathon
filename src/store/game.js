import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'game',
    initialState: {
        data : Object(),
        player1 : Object(),
        player2 : [],
        winner : 0,
    },
    reducers: {
            onPokemonAdd: (state,action) => {
                const {key , value} = action.payload;
                let modP1 = state.player1;
                if (modP1[key])
                {
                    const copyState = {...state.player1};
                    delete copyState[key];
                    modP1 = copyState;
                }
                else
                    modP1 = { ...modP1, [key] : value}
                return ({
                    ...state,
                    player1: modP1,
                })
            },
            player2Set : (state,action) => ({
                ...state,
                player2: action.payload,
            }),
            clean : (state,action) => ({
                data : Object(),
                player1 : Object(),
                player2 : [],
                winner : 0,
            }),
            setWinner : (state,action) => ({
                ...state,
                winner: action.payload,
            }),
    }
})


export const gameMethods = slice.actions;
export const selectGame = state => state.game;

export default slice.reducer;