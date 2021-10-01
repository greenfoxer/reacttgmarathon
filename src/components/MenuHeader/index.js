import React, {useState} from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { selectAuth, signIn, logOut, signUp } from "../../store/auth";

import LoginForm from "../LoginForm";
import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";

const MenuHeader = (bgActive) => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const authContext = useSelector(selectAuth)
    const onMenuStateChange = () => {
        setMenuOpened(prevState => !prevState);
    }
    const handleClickLogin = () => {
        console.log(authContext.isLoggedIn);
        if(authContext.isLoggedIn)
        {
            localStorage.removeItem('idToken');
            window.location.replace('/');
        }
        else
            setIsOpenModal(prevState => !prevState);
    }
    const handleSubmitLoginForm =  async (data) => {
        if(data.isSignin)
        {
            signIn(data);
            if(authContext.isLoggedIn)
                setIsOpenModal(prevState => false);
        }
        else
        {
            signUp(data);
            if(authContext.isLoggedIn)
                setIsOpenModal(prevState => !prevState);
        }
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened} />
            <NavBar isLoggedIn={authContext.isLoggedIn}
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