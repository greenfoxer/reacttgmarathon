import React from "react";
import cn from 'classnames'
import sComp from './style.module.css'

const NavBar = ({onMenuStateChange, isMenuShowed}) => {
    const onClickLink = () =>{
        onMenuStateChange && onMenuStateChange();
    }
    return(
        <nav className={sComp.root}>
            <div className={sComp.navWrapper}>
                <p className={sComp.brand}>
                LOGO
                </p>
                <a href="/#" className={cn(sComp.menuButton, {[sComp.active] : isMenuShowed})} onClick={onClickLink}>
                <span />
                </a>
            </div>
        </nav>
    );
};

export default NavBar;