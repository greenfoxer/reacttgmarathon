import React, {useState, useEffect, useContext} from 'react'
import Layout from './../../../../components/Layout';
import PokemonCard from "./../../../../components/PokemonCard";
import sComp from "./style.module.css";
import { FireBaseContext } from './../../../../contexts/FirebaseContext';

const StartPage = ({onPageChange}) =>{
    const pokemonContext = useContext(FireBaseContext);
    const [cards, setCards] = useState({});

    /* const updateCards = async () => {
        await pokemonContext.GetAllPokemons(setCards);
        //await pokemonContext.GetPokemonSocket((pokemons) => setCards(pokemons));
    } */

    useEffect(() =>{ console.log('useEffect Start'); 
        //updateCards();
        pokemonContext.GetPokemonSocket(setCards); 
    }, []);

    const onClickButton = () =>{
        const objArr = Object.entries(cards);
        const randomPokemon = objArr[Math.floor(Math.random()*objArr.length)][1];
        randomPokemon.isActive=false;
        pokemonContext.AddNewPokemon(randomPokemon);
    }
    const pickCard = (objectId) => {
        setCards( (prevState) => {
            return Object.entries(prevState).reduce((acc, item) => {
                
                if (item[0] === objectId) {
                    const pokemon = {...item[1]};
                    pokemon.isActive = !pokemon.isActive ;
                    pokemonContext.UpdatePokemonById(objectId, {...pokemon});
                    acc[objectId] = pokemon;
                }
                else
                    acc[item[0]]=item[1];
                
                return acc;
            }, {});
        });
    }
    return(
        <React.Fragment>
        <div className={sComp.wrapper}>
            <button onClick={onClickButton}>
                Add pokemon to deck!
            </button>
        </div>
        <Layout title="Pokemons" colorBg="SkyBlue">
            <div className="flex">
            {
                Object.entries(cards).map(([key,item]) => <PokemonCard key={key} objectId={key}
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    pickCard={pickCard} isActive={item.isActive}
                    />)
            }
            </div>
        </Layout>
      </React.Fragment>
    )
}

export default StartPage;