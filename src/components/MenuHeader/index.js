import React, {useState} from "react";
import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = (bgActive) => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const onMenuStateChange = () => {
        setMenuOpened(prevState => !prevState);
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened} />
            <NavBar onMenuStateChange={onMenuStateChange} bgActive={bgActive} isMenuShowed={isMenuOpened}/>
        </React.Fragment>
    )
}

export default MenuHeader;