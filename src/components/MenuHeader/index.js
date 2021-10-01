import React, {useState} from "react";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";

import LoginForm from "../LoginForm";
import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";

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

const MenuHeader = (bgActive) => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("idToken") !== null);
    const onMenuStateChange = () => {
        setMenuOpened(prevState => !prevState);
    }
    const handleClickLogin = () => {
        console.log(isLoggedIn);
        if(isLoggedIn)
        {
            localStorage.removeItem('idToken');
            window.location.reload();
        }
        else
            setIsOpenModal(prevState => !prevState);
    }
    const handleSubmitLoginForm =  async (data) => {
        const key='AIzaSyBpwM-_LN_TarR1NbNedA5hbeae-nmGaI4'
        if(data.isSignin)
        {

            const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
            const result = await auth(signInURL, data);
            if(result)
                setIsOpenModal(prevState => false);
        }
        else
        {
            const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
            const result = await auth(signUpURL, data);
            if(result)
                setIsOpenModal(prevState => !prevState);
        }
        setIsLoggedIn( prev => localStorage.getItem("idToken") !== null);
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened} />
            <NavBar isLoggedIn={isLoggedIn}
                    onMenuStateChange={onMenuStateChange} 
                    bgActive={bgActive} 
                    isMenuShowed={isMenuOpened}
                    onClickLogin={handleClickLogin}/>

            <Modal isOpen={isOpenModal} title='Auth...'
                    onCloseModal={handleClickLogin}>
                <LoginForm onSubmit={handleSubmitLoginForm}/>
            </Modal>
        </React.Fragment>
    )
}

export default MenuHeader;