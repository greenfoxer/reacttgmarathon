import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  signIn, logOut, signUp, isLoggedIn } from "../../store/auth";

import LoginForm from "../LoginForm";
import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";

const MenuHeader = (bgActive) => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();
    const loggedIn = useSelector(isLoggedIn)
    useEffect( () =>{
        if(loggedIn === true)
                setIsOpenModal(prevState => false);
    },[loggedIn])

    const onMenuStateChange = () => {
        setMenuOpened(prevState => !prevState);
    }
    const handleClickLogin = () => {
        if(loggedIn ===true )
        {
            dispatch(logOut());
            //window.location.replace('/');
        }
        else if( loggedIn === false)
            setIsOpenModal(prevState => !prevState);
    }
    const handleSubmitLoginForm =  async (data) => {
        if(data.isSignin)
        {
            dispatch(signIn(data));
            if(loggedIn === true)
            {
                setIsOpenModal(prevState => false);
            }
        }
        else
        {
            dispatch(signUp(data));
            if(loggedIn === true)
            {
                setIsOpenModal(prevState => false);
            }
        }
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened} />
            <NavBar isLoggedIn={loggedIn}
                    onMenuStateChange={onMenuStateChange} 
                    bgActive={bgActive} 
                    isMenuShowed={isMenuOpened}
                    onClickLogin={handleClickLogin}/>

            <Modal isOpen={isOpenModal} title='Auth...'
                    onCloseModal={handleClickLogin}>
                <LoginForm onSubmit={handleSubmitLoginForm} isOpenModal={isOpenModal}/>
            </Modal>
        </React.Fragment>
    )
}

export default MenuHeader;