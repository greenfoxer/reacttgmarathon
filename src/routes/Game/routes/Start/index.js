import React, {useState, useEffect, useContext} from 'react'
import Layout from './../../../../components/Layout';
import PokemonCard from "./../../../../components/PokemonCard";
import sComp from "./style.module.css";
import { FireBaseContext } from './../../../../contexts/FirebaseContext';
import { PokemonContext } from '../../../../contexts/PokemonContext';
import { useHistory } from 'react-router-dom';

const StartPage = ({onPageChange}) =>{
    const pokemonContext = useContext(FireBaseContext);
    const gameContext = useContext(PokemonContext);
    const history = useHistory();
    const [cards, setCards] = useState({});

    useEffect(() =>{ 
        pokemonContext.GetPokemonSocket(setCards); 

        return () => {pokemonContext.OffPokemonSocket();}
    }, []);

    const onClickButton = () =>{
        history.push('/game/board');
    }
    const pickCard = (objectId) => {
        const objTosend = cards[objectId];
        gameContext.onPokemonAdd(objectId,objTosend);
        
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