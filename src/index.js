import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { FireBaseContext } from './contexts/FirebaseContext';
import Firebase from './Services/firebase';

import {createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

import rootReducer, * as actions from './store/counter';
const store = new createStore(rootReducer);
//store.subscribe( () => console.log(store.getState()));
const {plusAction, minusAction} = bindActionCreators(actions, store.dispatch);

plusAction(3);
minusAction(5);
plusAction(7);
minusAction(1);

ReactDOM.render(
    <Provider store={store}>
        <FireBaseContext.Provider value={new Firebase()}>
            <BrowserRouter> 
                <App /> 
            </BrowserRouter>
        </FireBaseContext.Provider>
    </Provider>, document.getElementById('root'));