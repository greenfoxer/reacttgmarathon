import styleComponent from './style.module.css'
import cn from 'classnames'

const Layout = ({title, descr, urlBg, colorBg, children}) => {
    const compositeBg =
    {
        backgroundImage : urlBg ? `url(${urlBg})` : "none",
        backgroundColor : colorBg ? `${colorBg}` : "transparent"
    }
    return (
        <section className={styleComponent.root} style={compositeBg}>
            <div className={styleComponent.wrapper}>
                <article>
                    <div className={styleComponent.title}> 
                        <h3>{title}</h3>
                        <span className={styleComponent.separator}></span>
                    </div>
                    <div className={cn(styleComponent.desc, styleComponent.full)}>
                        {children ? children : descr}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Layout;