import cn from 'classnames'
import sComp from './style.module.css'

import {ReactComponent as LoginSVG} from './../../Assets/login.svg'
import {ReactComponent as LogoutSVG} from './../../Assets/logout.svg'
import {ReactComponent as UserSVG} from './../../Assets/user.svg';
import { useSelector } from 'react-redux';
import {hasLocalId} from './../../store/auth';
import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = ({ isLoggedIn, onMenuStateChange, bgActive = false, isMenuShowed, onClickLogin}) => {
    const onClickLink = () =>{
        onMenuStateChange && onMenuStateChange();
    }
    const hasUser = useSelector(hasLocalId);
    return(
        <nav id={sComp.navbar} className={cn(sComp.root, { [sComp.bgActive] : bgActive})}>
            <div className={sComp.navWrapper}>
                <p className={sComp.brand}>
                LOGO
                </p>
                <div className={sComp.loginAndMenu}>
                    <div className={sComp.loginWrap} onClick={onClickLogin}>
                        {
                            isLoggedIn ? <LogoutSVG /> : <LoginSVG />
                        }
                    </div>
                    {
                        hasUser ? <Link className={sComp.loginWrap} to='/user'> <UserSVG/> </Link> : <React.Fragment/>
                    }
                    <div className={cn(sComp.menuButton, {[sComp.active] : isMenuShowed})} onClick={onClickLink}>
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;