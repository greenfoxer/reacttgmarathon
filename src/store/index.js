import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import gameReducer from './game';
import cardsReducer from './cards';
import authReducer from "./auth";


export default configureStore({
    reducer : {
        counter : counterReducer,
        game : gameReducer,
        cards: cardsReducer,
        auth: authReducer,
    }
})