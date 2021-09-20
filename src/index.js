import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { FireBaseContext } from './contexts/FirebaseContext';
import Firebase from './Services/firebase';

ReactDOM.render(
    <FireBaseContext.Provider value={new Firebase()}>
        <BrowserRouter> 
            <App /> 
        </BrowserRouter>
    </FireBaseContext.Provider>, document.getElementById('root'));