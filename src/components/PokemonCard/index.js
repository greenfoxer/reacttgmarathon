import { useState } from 'react';

import styleComponent from './style.module.css'
import CardBack from './../../Assets/card-back-side.jpg'

const PokemonCard = ({id, name, type, img, values}) => {
    const [isActive, setActive] = useState(false);
    
    const handleCardClick =() =>{
        setActive(!isActive);
    };
    return(
        <div className={styleComponent.root} onClick={handleCardClick}>
            <div className={`${styleComponent.pokemonCard} ${ isActive ? styleComponent.active : ''}`}>
                <div className={styleComponent.cardFront}>
                    <div className={`${styleComponent.wrap} ${styleComponent.front}`}>
                        <div className={`${styleComponent.pokemon} ${styleComponent[type]}`}> 
                            <div className={styleComponent.values}>
                                <div className={`${styleComponent.count} ${styleComponent.top}`}>{values.top}</div>
                                <div className={`${styleComponent.count} ${styleComponent.right}`}>{values.right}</div>
                                <div className={`${styleComponent.count} ${styleComponent.bottom}`}>{values.bottom}</div>
                                <div className={`${styleComponent.count} ${styleComponent.left}`}>{values.left}</div>
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
                    <div className={`${styleComponent.wrap} ${styleComponent.back}`}>
                        <img src={CardBack} alt="Сard Backed" />
                    </div>
                </div>

            </div>
        </div>);
}

export default PokemonCard;