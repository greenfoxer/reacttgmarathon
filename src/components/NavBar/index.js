import React from "react";
import cn from 'classnames'
import sComp from './style.module.css'

import {ReactComponent as LoginSVG} from './../../Assets/login.svg'

const NavBar = ({onMenuStateChange, bgActive = false, isMenuShowed, onClickLogin}) => {
    const onClickLink = () =>{
        onMenuStateChange && onMenuStateChange();
    }
    return(
        <nav id={sComp.navbar} className={cn(sComp.root, { [sComp.bgActive] : bgActive})}>
            <div className={sComp.navWrapper}>
                <p className={sComp.brand}>
                LOGO
                </p>
                <div className={sComp.loginAndMenu}>
                    <div className={sComp.loginWrap} onClick={onClickLogin}>
                        <LoginSVG />
                    </div>
                    <div className={cn(sComp.menuButton, {[sComp.active] : isMenuShowed})} onClick={onClickLink}>
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;