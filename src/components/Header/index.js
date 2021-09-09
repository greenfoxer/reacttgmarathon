import styleComponent from './style.module.css';

const Header = ({title, descr}) => {
    return (
        <header className={styleComponent.root}>
            <div className={styleComponent.forest}></div>
            <div className={styleComponent.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
            </div>
        </header>
    )
};

export default Header;