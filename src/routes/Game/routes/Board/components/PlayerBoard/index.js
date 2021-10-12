import React, {useState} from 'react';
import cn from 'classnames';
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';

const PlayerBoard = ({player, cards, onCardChosen}) => {
    return (
        <React.Fragment>
            {
                cards.map( (item, key) => {return (
                <div key={key} className={cn(s.cardBoard, {[s.selected] : item.isSelected === true})}
                    onClick={ () => { 
                        onCardChosen && onCardChosen({player, ...item});
                             
                    }}
                >
                    <PokemonCard key={key}
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    isActive minimize={true} 
                    />
                </div>
                );}
                )
            }
        </React.Fragment>
    )
}

export default PlayerBoard;
