import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn : localStorage.getItem('idToke') !== null
    },
    reducers: {
            signin: (state,action) =>  ({
                    isLoggedIn: action.payload,
                }),
            signup : (state,action) =>  ({
                isLoggedIn: action.payload,
            }),
            logout : (state,action) =>  ({
                isLoggedIn: false,
            }),
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
        return false;
    }
    else
    {
        localStorage.setItem('idToken', response.idToken);
        NotificationManager.success("Login success!");
        return true;
    }
}

const key='AIzaSyBpwM-_LN_TarR1NbNedA5hbeae-nmGaI4'

const authMethods = slice.actions;

export const signIn = (data) => async (dispatch) => {
    console.log('signUp', data);
    const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    const result = await auth(signInURL, data);
    dispatch(authMethods.signin(result));
}
export const signUp = (data) => async (dispatch) => {
    console.log('signIn', data);
    const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    const result = await auth(signUpURL, data);
    dispatch(authMethods.signup(result));
}
export const logOut = () => async (dispatch) => {
    localStorage.removeItem('idToken');
    dispatch(authMethods.logout());
}

export const selectAuth = state => state.auth;

export default slice.reducer;