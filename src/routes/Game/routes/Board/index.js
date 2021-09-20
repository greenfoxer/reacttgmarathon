import s from './style.module.css';
import { useContext } from 'react';
import { PokemonContext } from '../../../../contexts/PokemonContext';
import PokemonCard from '../../../../components/PokemonCard';

const BoardPage = () => {
    const gameContext = useContext(PokemonContext);
    const cards = gameContext.pokemons;
    console.log('cards', cards);
    return (
        <div className={s.root}>
						<div className={s.playerOne}>
                            {
                        Object.entries(cards).map(([key,item]) => <PokemonCard key={key} objectId={key}
                            id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                            isActive={true} isSelected={item.isSelected}
  
                            />)
}
						</div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;