import React, {useState, useEffect, useContext} from 'react'
import Layout from './../../../../components/Layout';
import PokemonCard from "./../../../../components/PokemonCard";
import sComp from "./style.module.css";
import { FireBaseContext } from './../../../../contexts/FirebaseContext';
import { PokemonContext } from '../../../../contexts/PokemonContext';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

const StartPage = ({onPageChange}) =>{
    const pokemonContext = useContext(FireBaseContext);
    const gameContext = useContext(PokemonContext);
    const history = useHistory();
    const [cards, setCards] = useState({});

    /* const updateCards = async () => {
        await pokemonContext.GetAllPokemons(setCards);
        //await pokemonContext.GetPokemonSocket((pokemons) => setCards(pokemons));
    } */

    useEffect(() =>{ 
        console.log('useEffect Start'); 
        //updateCards();
        pokemonContext.GetPokemonSocket(setCards); 
        console.log(cards);

        return () => { console.log('unsubscribe');pokemonContext.OffPokemonSocket();}
    }, []);

    const onClickButton = () =>{
        console.log(gameContext.pokemons);
        history.push('/game/board');
        /* const objArr = Object.entries(cards);
        const randomPokemon = objArr[Math.floor(Math.random()*objArr.length)][1];
        randomPokemon.isActive=false;
        pokemonContext.AddNewPokemon(randomPokemon); */
    }
    const pickCard = (objectId) => {
        const objTosend = cards[objectId];
        console.log(objTosend);
        gameContext.onPokemonAdd(objectId,objTosend);
        setCards( (prevState) => ({
            ...prevState,
            [objectId] : {
                ...prevState[objectId],
                isSelected : !prevState[objectId].isSelected
            }
           /*  return Object.entries(prevState).reduce((acc, item) => {
                
                if (item[0] === objectId) {
                    const pokemon = {...item[1]};
                    pokemon.isSelected = !pokemon.isSelected ;
                    acc[objectId] = pokemon;
                    gameContext.onPokemonAdd(objectId,pokemon);
                }
                else
                    acc[item[0]]=item[1];
                
                return acc;
            }, {}); */
        }));
    }
    return(
        <React.Fragment>
        <div className={sComp.wrapper}>
            <button onClick={onClickButton}
                disabled={Object.keys(gameContext.pokemons).length < 5 }
            >
                Add pokemon to deck!
            </button>
        </div>
        <Layout title="Pokemons" colorBg="SkyBlue">
            <div className={sComp.flex}>
            {
                Object.entries(cards).map(([key,item]) => <PokemonCard key={key} objectId={key}
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    pickCard={ () =>{
                        if(Object.keys(gameContext.pokemons).length < 5 || item.isSelected)
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