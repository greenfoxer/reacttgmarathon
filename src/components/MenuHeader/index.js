import React, {useState} from "react";
import { NotificationManager } from "react-notifications";

import LoginForm from "../LoginForm";
import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";

const MenuHeader = (bgActive) => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const onMenuStateChange = () => {
        setMenuOpened(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setIsOpenModal(prevState => !prevState);
    }
    const handleSubmitLoginForm =  async (data) => {
        console.log(data);
        const key='AIzaSyBpwM-_LN_TarR1NbNedA5hbeae-nmGaI4'
        if(data.isSignin)
        {
            const request = {
                method: "POST",
                body: JSON.stringify({
                    email : data.email,
                    password : data.password,
                    returnSecureToken : true
                })
            }
            const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
            const response = await fetch(signInURL, request).then( res => res.json());

            if(response.hasOwnProperty('error'))
            {
                NotificationManager.error(response.error.message,"Error");
            }
            else
            {
                NotificationManager.success("Login success!");
            }
        }
        else
        {
            const request = {
                method: "POST",
                body: JSON.stringify({
                    email : data.email,
                    password : data.password,
                    returnSecureToken : true
                })
            }
            const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
            const response = await fetch(signUpURL, request).then( res => res.json());
            if(response.hasOwnProperty('error'))
            {
                NotificationManager.error(response.error.message,"Error");
            }
            else
            {
                NotificationManager.success("Sign up success!");
            }
        }
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened} />
            <NavBar onMenuStateChange={onMenuStateChange} 
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