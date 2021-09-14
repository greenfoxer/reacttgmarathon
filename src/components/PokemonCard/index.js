import { useState } from 'react';
import cn from 'classnames'

import styleComponent from './style.module.css'
import CardBack from './../../Assets/card-back-side.jpg'

const PokemonCard = ({id, name, type, img, values}) => {
    const [isActive, setActive] = useState(false);
    
    const handleCardClick =() =>{
        setActive(!isActive);
    };
    return(
        <div className={styleComponent.root} onClick={handleCardClick}>
            <div className={cn(styleComponent.pokemonCard, { [styleComponent.active] : isActive})}>
                <div className={styleComponent.cardFront}>
                    <div className={cn(styleComponent.wrap, styleComponent.front)}>
                        <div className={cn(styleComponent.pokemon, styleComponent[type])}> 
                            <div className={styleComponent.values}>
                                <div className={cn(styleComponent.count, styleComponent.top)}>{values.top}</div>
                                <div className={cn(styleComponent.count, styleComponent.right)}>{values.right}</div>
                                <div className={cn(styleComponent.count, styleComponent.bottom)}>{values.bottom}</div>
                                <div className={cn(styleComponent.count, styleComponent.left)}>{values.left}</div>
                            </div>
                            <div className={styleComponent.imgContainer}>
                                <img src={img} alt={name} />
                            </div>
                            <div className={styleComponent.info}>
                                <span className={styleComponent.number}>#{id}</span>
                                <h3 className={styleComponent.name}>{name.toUpperCase()}</h3>
                                <small className={styleComponent.type}>Type: <span>{type.toUpperCase()}</span></small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styleComponent.cardBack}>
                    <div className={cn(styleComponent.wrap, styleComponent.back)}>
                        <img src={CardBack} alt="Сard Backed" />
                    </div>
                </div>

            </div>
        </div>);
}

export default PokemonCard;