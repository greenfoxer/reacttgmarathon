import React, {useState, useEffect} from 'react'
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";
import sComp from "./style.module.css";
import database from '../../Services/firebase';

const GamePage = ({onPageChange}) =>{
    const updateCards = () => {
        database.ref('pokemons').once('value', (snapshot) =>{
            setCards(snapshot.val());
        });
    }
    useEffect(() =>{
        updateCards();
    }, []);
    const [cards, setCards] = useState({});
    const onClickButton = () =>{
        const objArr = Object.entries(cards);
        const randomPokemon = objArr[Math.floor(Math.random()*objArr.length)][1];
        randomPokemon.isActive=false;
        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(randomPokemon);
        updateCards();
    }
    const pickCard = (id) => {
        setCards( (prevState) => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.isActive = !pokemon.isActive ;
                    database.ref('pokemons/'+ item[0]).set({
                        ...pokemon
                    });
                };
                
                acc[item[0]] = pokemon;
        
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
                Object.entries(cards).map(([key,item]) => <PokemonCard key={key} 
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    pickCard={pickCard} isActive={item.isActive}
                    />)
            }
            </div>
        </Layout>
      </React.Fragment>
    )
}

export default GamePage;