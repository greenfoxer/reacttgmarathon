import React from "react";
import cn from 'classnames'
import sComp from './style.module.css'

const Menu = ({onMenuStateChange, isMenuShowed}) => {
    const onClickMenu = () =>{
        onMenuStateChange();
    }
    return(
        <div className={cn(sComp.menuContainer, {[sComp.active] : isMenuShowed} , {[sComp.deactive] : !isMenuShowed})} onClick={onClickMenu}>
            <div className={sComp.overlay} />
            <div className={sComp.menuItems}>
                <ul>
                <li>
                    <a href="#welcome">
                    HOME
                    </a>
                </li>
                <li>
                    <a href="#game">
                    GAME
                    </a>
                </li>
                <li>
                    <a href="#about">
                    ABOUT
                    </a>
                </li>
                <li>
                    <a href="#contact">
                    CONTACT
                    </a>
                </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;