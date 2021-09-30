import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import s from './style.module.css';
import cn from 'classnames';
import PokemonCard from "../../../../components/PokemonCard";
import { useSelector } from "react-redux";
import { selectGame, gameMethods } from '../../../../store/game';
import { addPokemon } from "../../../../store/cards";
import { useDispatch } from 'react-redux';


const FinishPage = () => {
    const gameContext = useSelector(selectGame);
    const dispatch = useDispatch();
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
            dispatch(addPokemon(selectedCard));
        }
        dispatch(gameMethods.clean());
        history.push('/game');
    }
    const pickCard = (key) => {
        console.log('key',key);
        setPlayer2( prevState => {
            return prevState.reduce((acc, item) =>{
                const newItem = { ...item, isSelected : false};
                if( newItem.id === key)
                {
                    setSelectedCard(item);
                    newItem.isSelected = true;
                }
                acc.push(newItem);
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