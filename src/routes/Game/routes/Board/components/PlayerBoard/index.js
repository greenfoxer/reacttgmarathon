import React from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';

const PlayerBoard = ({cards}) => {
    console.log(cards);
    return (
        <React.Fragment>
            {
                cards.map( (item) => 
                <div key={item.id} className={s.cardBoard}>
                    <PokemonCard 
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    isActive minimize={true} className={s.card}
                    />
                </div>
                )
            }
        </React.Fragment>
    )
}

export default PlayerBoard;
