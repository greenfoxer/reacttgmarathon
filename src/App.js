import React, {useEffect} from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import {useDispatch} from 'react-redux';

import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import AboutPage from "./routes/About";
import ContactsPage from "./routes/Contacts";
import NotFoundPage from "./routes/NotFound";
import MenuHeader from "./components/MenuHeader";
import './App.css';
import 'react-notifications/lib/notifications.css';
import sComp from './style.module.css';
import Footer from "./components/Footer";
import cn from 'classnames'
import PrivateRoute from "./components/PrivateRoute";
import { getUserAsync } from "./store/auth";
import User from "./routes/User";

const App = () =>{
  const location = useLocation();
  const isMainPage = location.pathname === '/' ||location.pathname === '/home' ||location.pathname === '/game/board' ;

  const dispatch = useDispatch();
  
  useEffect( ()=>{ 
    dispatch(getUserAsync());
  }, []);
  
  return(
    <React.Fragment>
      <Switch>
        <Route path="/404" component={NotFoundPage} />
        <Route>
          <React.Fragment>
            <MenuHeader bgActive={!isMainPage} />
            <div className={cn(sComp.wrap, {[sComp.isHomePage] : isMainPage})}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage}  />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/user" component={User} />
                <Route path="/contacts" component={ContactsPage} />
                <Route render={ () => ( <Redirect to='/404'/>)} />
              </Switch>
            </div>
            <Footer/>
          </React.Fragment>
        </Route>
      </Switch>
      <NotificationContainer />
    </React.Fragment>
  );
}

export default App;