import React, {useState} from "react";
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
    const handleSubmitLoginForm = (data) => {
        console.log(data);
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened} />
            <NavBar onMenuStateChange={onMenuStateChange} 
                    bgActive={bgActive} 
                    isMenuShowed={isMenuOpened}
                    onClickLogin={handleClickLogin}/>

            <Modal isOpen={isOpenModal} title='Login...'
                    onCloseModal={handleClickLogin}>
                <LoginForm onSubmit={handleSubmitLoginForm}/>
            </Modal>
        </React.Fragment>
    )
}

export default MenuHeader;