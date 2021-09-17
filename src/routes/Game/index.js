import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import database from '../../Services/firebase';

const GamePage = ({onPageChange}) =>{
    useEffect(() =>{
        database.ref('pokemons').once('value', (snapshot) =>{
            setCards(snapshot.val());
        })
    }, []);
    const history = useHistory();
    const [cards, setCards] = useState({});
    const onClickButton = () =>{
        history.push('/home');
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
        <div>
            <h1>This is empty game page!</h1>
            <button onClick={onClickButton}>
                Home
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