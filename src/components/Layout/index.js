import styleComponent from './style.module.css'

const Layout = ({title, descr, urlBg, colorBg}) => {
    const compositeBg =
    {
        backgroundImage : urlBg ? `url(${urlBg})` : "none",
        backgroundColor : colorBg ? `${colorBg}` : "none"
    }
    return (
        <section className={styleComponent.root} style={compositeBg}>
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