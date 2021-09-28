import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { FireBaseContext } from './contexts/FirebaseContext';
import Firebase from './Services/firebase';

import { Provider } from 'react-redux';

import store from './store';

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter> 
                <App /> 
            </BrowserRouter>
    </Provider>, document.getElementById('root'));