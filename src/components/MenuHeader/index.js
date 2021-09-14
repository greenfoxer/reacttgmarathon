import React, {useState} from "react";
import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = () => {
    const [isMenuOpened, setMenuOpened] = useState(undefined);
    const onMenuStateChange = () => {
        setMenuOpened(!isMenuOpened);
    }
    return(
        <React.Fragment>
            <Menu onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened}/>
            <NavBar onMenuStateChange={onMenuStateChange} isMenuShowed={isMenuOpened}/>
        </React.Fragment>
    )
}

export default MenuHeader;