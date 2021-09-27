import React, {useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import { PokemonContext } from "../../../../contexts/PokemonContext";
import s from './style.module.css';
import cn from 'classnames';
import PokemonCard from "../../../../components/PokemonCard";
import { FireBaseContext } from './../../../../contexts/FirebaseContext';

const FinishPage = () => {
    const gameContext = useContext(PokemonContext);
    const dbContext = useContext(FireBaseContext);
    const history = useHistory();
    const [selectedCard, setSelectedCard] = useState(null);

    const player1 = gameContext.player1;
    const [player2,setPlayer2] = useState(gameContext.player2);

    if(Object.keys(player1).length === 0)
        history.replace('/game');

    const saveResultAndFinish = () => {
        if(selectedCard !== null)
        {
            delete selectedCard.isSelected;
            dbContext.AddNewPokemon(selectedCard)
        }
        gameContext.clean();
        history.push('/game');
    }
    const pickCard = (key) => {
        setPlayer2( prevState => {
            return prevState.reduce((acc, item) =>{
                item.isSelected = false;
                if( item.id === key)
                {
                    setSelectedCard(item);
                    item.isSelected = true;
                }
                acc.push(item);
                return acc;
            },[]);
        })
    }
    return (
        <React.Fragment>
            <div className={s.root}>
                <div className={cn(s.flex, s.playerOne)}>
                    {
                        Object.entries(player1).map(([key,item]) => <PokemonCard key={key} objectId={key}
                        id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                        isActive={true} isSelected={item.isSelected} className={s.origin}
                        />)
                    }
                </div>
                <div className={s.wrapper}>
                    <button onClick={saveResultAndFinish}
                            disabled={( gameContext.winner === 1) && (selectedCard === null)}>
                        FINISH GAME
                    </button>
                </div>
                <div className={cn(s.flex, s.playerTwo)}>
                    {
                        player2.map((item,key) => <PokemonCard key={key} 
                        id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                        pickCard={ () =>{ if(gameContext.winner === 1) { pickCard(item.id);}}} isActive={true} isSelected={item.isSelected}
                            className={s.origin}
                        />)
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default FinishPage;