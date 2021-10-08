import React, {useState, useEffect} from 'react'
import Layout from './../../../../components/Layout';
import PokemonCard from "./../../../../components/PokemonCard";
import sComp from "./style.module.css";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectGame , gameMethods} from '../../../../store/game';
import { getPokemonsAsync, deck } from '../../../../store/cards';
import {isActionProcessing} from '../../../../store/auth';

const StartPage = ({onPageChange}) =>{
    const gameContext = useSelector(selectGame);

    const isAuthProcessing = useSelector(isActionProcessing);
    const deckCards = useSelector(deck);
    const dispatch = useDispatch();
    const history = useHistory();
    const [cards, setCards] = useState(deckCards);

    const updatePokemons = () => {
        if(isAuthProcessing === false)
            dispatch(getPokemonsAsync());
    };

    useEffect(() =>{ 
        updatePokemons();
    }, []);

    useEffect(() =>{ 
        updatePokemons();
    }, [isAuthProcessing]);
    
    useEffect(() => {

        setCards(deckCards);

    }, [deckCards])

    const onClickButton = () =>{
        history.push('/game/board');
    }
    const pickCard = (objectId) => {
        const objTosend = cards[objectId];
        dispatch(gameMethods.onPokemonAdd({ key : objectId, value : objTosend}));
        
        setCards( (prevState) => ({
            ...prevState,
            [objectId] : {
                ...prevState[objectId],
                isSelected : !prevState[objectId].isSelected
            }
        }));
    }

    return(
        <React.Fragment>
        <div className={sComp.wrapper}>
            <button onClick={onClickButton}
                disabled={Object.keys(gameContext.player1).length < 5 }
            >
                START THE GAME!
            </button>
        </div>
        <Layout title="Pokemons" colorBg="SkyBlue">
            <div className={sComp.flex}>
            {
                Object.entries(cards).map(([key,item]) => <PokemonCard key={key} objectId={key}
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    pickCard={ () =>{
                        if(Object.keys(gameContext.player1).length < 5 || item.isSelected)
                        pickCard(key);}} isActive={true} isSelected={item.isSelected}
                    className={sComp.origin}
                    />)
            }
            </div>
        </Layout>
      </React.Fragment>
    )
}

export default StartPage;