import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import gameReducer from './game';
import cardsReducer from './cards';


export default configureStore({
    reducer : {
        counter : counterReducer,
        game : gameReducer,
        cards: cardsReducer
    }
})