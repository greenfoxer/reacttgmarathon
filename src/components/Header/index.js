import styleComponent from './style.module.css';

const Header = ({title, descr, onClickButton}) => {
    const handleClick = () => {
        onClickButton && onClickButton('game');
    }
    return (
        <header className={styleComponent.root}>
            <div className={styleComponent.forest}></div>
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