import React from "react";
import cn from 'classnames'
import sComp from './style.module.css'
import { Link } from "react-router-dom";

const MENUITEMS = [
    'home',
    'game',
    'contacts',
    'about'
]

const Menu = ({onMenuStateChange,isMenuShowed}) => {
    const onClickMenuItem = () => {
        onMenuStateChange && onMenuStateChange();
    }
    return(
        <div className={cn(sComp.menuContainer, {[sComp.active] : isMenuShowed === true} , {[sComp.deactive] : isMenuShowed === false})}>
            <div className={sComp.overlay} />
            <div className={sComp.menuItems}>
                <ul>
                    { MENUITEMS.map( (s, index) => (<li key={index}><Link onClick={onClickMenuItem} to={'/'+s}>{s.toUpperCase()} </Link></li>)) }
                </ul>
            </div>
        </div>
    );
};

export default Menu;