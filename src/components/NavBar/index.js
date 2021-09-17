import React from "react";
import cn from 'classnames'
import sComp from './style.module.css'

const NavBar = ({onMenuStateChange, bgActive = false, isMenuShowed}) => {
    const onClickLink = () =>{
        onMenuStateChange && onMenuStateChange();
    }
    return(
        <nav id={sComp.navbar} className={cn(sComp.root, { [sComp.bgActive] : bgActive})}>
            <div className={sComp.navWrapper}>
                <p className={sComp.brand}>
                LOGO
                </p>
                <div className={cn(sComp.menuButton, {[sComp.active] : isMenuShowed})} onClick={onClickLink}>
                <span />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;