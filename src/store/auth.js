import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import FirebaseClass from "../Services/firebase";

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn : localStorage.getItem('idToken') !== null,
        isActionProcessing : true,
        currentUser : Object(),
    },
    reducers: {
            start: state =>({
                 ...state,
                isActionProcessing: true
            }),
            signin: (state,action) =>  ({ ...state,
                    isLoggedIn: action.payload,
                }),
            signup : (state,action) =>  ({ ...state,
                isLoggedIn: action.payload,
            }),
            logout : (state) =>  ({ ...state,
                currentUser: Object(),
                isLoggedIn: false,
                isActionProcessing : false,
            }),
            getUser : (state, action) => ({
                ...state,
                currentUser : action.payload
            }),
            end: state => ({...state, isActionProcessing : false})
    }
})


const auth = async (url, data) => {

    const request = {
        method: "POST",
        body: JSON.stringify({
            email : data.email,
            password : data.password,
            returnSecureToken : true
        })
    }
    
    const response = await fetch(url, request).then( res => res.json());

    if(response.hasOwnProperty('error'))
    {
        NotificationManager.error(response.error.message,"Error");
        return { result : false};
    }
    else
    {
        localStorage.setItem('idToken', response.idToken);
        return {result : true, idToken : response.idToken, localId: response.localId}
    }
}

const key='AIzaSyBpwM-_LN_TarR1NbNedA5hbeae-nmGaI4'

const authMethods = slice.actions;

export const isLoggedIn = state => state.auth.isLoggedIn;

export const hasLocalId = state => state.auth.currentUser?.localId;

export const isActionProcessing = state => state.auth.isActionProcessing;

export const signIn = (data) => async (dispatch) => {
    dispatch(authMethods.start());
    const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    const {result} = await auth(signInURL, data);
    dispatch(authMethods.signin(result));
    if(result)
    {
        dispatch(getUserAsync());
        NotificationManager.success("Login success!");
    }
}
export const signUp = (data) => async (dispatch) => {
    dispatch(authMethods.start());
    const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    const {result, idToken, localId} = await auth(signUpURL, data);
    dispatch(authMethods.signup(result));
    if(result){
        const startDeck = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
        startDeck.data.map( card =>{
            return FirebaseClass.AddNewPokemonAPI(card, {idToken, localId});
        });

        NotificationManager.success("Success!");
        dispatch(getUserAsync());
    }
}
export const logOut = () => async (dispatch) => {
    localStorage.removeItem('idToken');
    dispatch(authMethods.logout());
    dispatch(getUserAsync());
}
const getInfoAsync = async () =>{
    const idToken = localStorage.getItem('idToken');
    if(idToken){
        const result = await FirebaseClass.GetUserInfoAPI(idToken);
        if(result)
            return result;
        else
            return false;
    }
    else
        return false;
}
export const getUserAsync = () => async (dispatch) => {
    const userInfo = await getInfoAsync();
    if(userInfo)
    {
        dispatch(authMethods.getUser(userInfo));
        dispatch(authMethods.end());   
    }
    else
    {
        dispatch(authMethods.logout());
    }
}

export const getUserSync = () => (dispatch) => {
    dispatch(authMethods.start());
    dispatch(getUserAsync());  
}


export const selectAuth = state => state.auth;

export default slice.reducer;