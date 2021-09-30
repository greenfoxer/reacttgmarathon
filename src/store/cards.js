import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../Services/firebase";

export const slice = createSlice({
    name: 'cards',
    initialState: {
        deck : Object(),
        isLoading : false,
        error : null
    },
    reducers: {
            fetchPokemons: state => ({
                ...state,
                isLoading : true,
            }),
            fetchPokemonsResolve: (state, action) => ({
                ...state,
                deck : action.payload, 
                isLoading : true,
            }),
            fetchPokemonsReject: (state, action) => ({
                ...state,
                isLoading : false,
                deck : Object(),
                error : action.payload
            }),
            addNewPokemon: (state) => (state),
    }
})

const cardsMethods = slice.actions;

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(cardsMethods.fetchPokemons);
    const data = await FirebaseClass.GetAllPokemons();
    dispatch(cardsMethods.fetchPokemonsResolve(data));
}

export const addPokemon = (pokemon) => async (dispatch) => {
    FirebaseClass.AddNewPokemon(pokemon, () => dispatch(cardsMethods.addNewPokemon()));
}

export const selectCards = state => state.cards;

export default slice.reducer;