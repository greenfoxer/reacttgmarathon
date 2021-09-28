import styleComponent from './style.module.css';
import { useHistory } from 'react-router-dom';

const Header = ({title, descr, onClickButton}) => {
    const history = useHistory();
    const handleClick = () => {
        //onClickButton && onClickButton();
        history.push('/game');
    }
    return (
        <header className={styleComponent.root}>
            <div className={styleComponent.forest}></div>
            <div className={styleComponent.silhouette}></div>
            <div className={styleComponent.moon}></div>
            <div className={styleComponent.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <button onClick={handleClick}>
                    Start Game
                </button>
            </div>
        </header>
    )
};

export default Header;