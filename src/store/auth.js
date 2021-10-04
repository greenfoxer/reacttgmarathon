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
                    isActionProcessing : false
                }),
            signup : (state,action) =>  ({ ...state,
                isLoggedIn: action.payload,
            }),
            logout : (state,action) =>  ({ ...state,
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

export const signIn = (data) => async (dispatch) => {
    console.log('signIn', data);
    dispatch(authMethods.start());
    const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    const {result} = await auth(signInURL, data);
    dispatch(authMethods.signin(result));
    if(result)
        NotificationManager.success("Login success!");
    dispatch(getUserAsync);
}
export const signUp = (data) => async (dispatch) => {
    console.log('signUp', data);
    dispatch(authMethods.start());
    const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    const {result, idToken, localId} = await auth(signUpURL, data);
    dispatch(authMethods.signup(result));
    if(result){
        const startDeck = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
        startDeck.data.map( card =>{
            FirebaseClass.AddNewPokemonAPI(card, {idToken, localId});
        });

        NotificationManager.success("Success!");
    }
    dispatch(authMethods.end());
}
export const logOut = () => async (dispatch) => {
    localStorage.removeItem('idToken');
    dispatch(authMethods.logout());
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
export const getUserAsync = async (dispatch) => {
    dispatch(authMethods.start());
    const userInfo = await getInfoAsync();
    console.log('getUserAsync', userInfo);
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

export const selectAuth = state => state.auth;

export default slice.reducer;