import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, signIn, logOut, signUp } from "../../store/auth";

import LoginForm from "../LoginForm";
import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";

const MenuHeader = (bgActive) => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();
    const authContext = useSelector(selectAuth)
    useEffect( () =>{
        console.log('useEffect');
        if(authContext.isLoggedIn)
                setIsOpenModal(prevState => !prevState);
    },[authContext])

    const onMenuStateChange = () => {
        setMenuOpened(prevState => !prevState);
    }
    const handleClickLogin = () => {
        console.log(authContext.isLoggedIn);
        if(authContext.isLoggedIn)
        {
            dispatch(logOut());
            //window.location.replace('/');
        }
        else
            setIsOpenModal(prevState => !prevState);
    }
    const handleSubmitLoginForm =  async (data) => {
        console.log(data);
        if(data.isSignin)
        {
            dispatch(signIn(data));
            if(authContext.isLoggedIn)
                setIsOpenModal(prevState => false);
        }
        else
        {
            dispatch(signUp(data));
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
                <LoginForm onSubmit={handleSubmitLoginForm} isOpenModal={isOpenModal}/>
            </Modal>
        </React.Fragment>
    )
}

export default MenuHeader;