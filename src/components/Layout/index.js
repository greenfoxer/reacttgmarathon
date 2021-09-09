import styleComponent from './style.module.css'

const Layout = ({title, descr, urlBg, colorBg}) => {
    const bgStyle = urlBg ? { backgroundImage : `url(${urlBg})`} : ( colorBg ? { backgroundColor : `${colorBg}`} : { background : 'None'});
    console.log('#### bgStyle', bgStyle);
    return (
        <section className={styleComponent.root} style={bgStyle}>
            <div className={styleComponent.wrapper}>
                <article>
                    <div className={styleComponent.title}> 
                        <h3>{title}</h3>
                        <span className={styleComponent.separator}></span>
                    </div>
                    <div className={[styleComponent.desc, styleComponent.full]}>
                        <p>{descr}</p>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Layout;