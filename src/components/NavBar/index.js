import cn from 'classnames'
import sComp from './style.module.css'

import {ReactComponent as LoginSVG} from './../../Assets/login.svg'
import {ReactComponent as LogoutSVG} from './../../Assets/logout.svg'

const NavBar = ({ isLoggedIn, onMenuStateChange, bgActive = false, isMenuShowed, onClickLogin}) => {
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
                        {
                            isLoggedIn ? <LogoutSVG /> : <LoginSVG />
                        }
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