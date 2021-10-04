import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../Services/firebase";
import { hasLocalId } from "./auth";

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
                isLoading : false,
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

export const getPokemonsAsync = () => async (dispatch,getState) => {
    const localId = hasLocalId(getState());
    dispatch(cardsMethods.fetchPokemons);
    const data = await FirebaseClass.GetAllPokemonsAPI(localId);
    dispatch(cardsMethods.fetchPokemonsResolve(data));
}

/* export const getPokemonsAsync = () => (dispatch) => {
    dispatch(getPokemonsUpdateAsync());
} */

export const addPokemon = (pokemon) => async (dispatch) => {
    FirebaseClass.AddNewPokemon(pokemon, () => dispatch(cardsMethods.addNewPokemon()));
}

export const addPokemonAPI = (pokemon, userInfo) => async (dispatch) => {
    FirebaseClass.AddNewPokemonAPI(pokemon, userInfo);
}

export const selectCards = state => state.cards;
export const deck = state => state.cards?.deck;
export const isLoading = state => state.cards.isLoading;

export default slice.reducer;