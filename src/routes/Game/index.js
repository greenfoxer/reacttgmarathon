import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import POKEMONS from '../../PokeDB.json';

const GamePage = ({onPageChange}) =>{
    const history = useHistory();
    const [cards, setCards] = useState(POKEMONS.slice(0,5));
    const onClickButton = () =>{
        history.push('/home');
    }
    const pickCard = (id) => {
        setCards( (prevState) => {
            const newState = [...prevState];
            const mutation = newState.find(x => x.id === id);
            const elNum = newState.indexOf(mutation);
            if (mutation.isActive === undefined)
            {
                const redacted = {...mutation, isActive : true};
                newState[elNum]=redacted;
            }
            else
                mutation.isActive = !mutation.isActive;
            return newState;
        })
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
                cards.map((item, index) => <PokemonCard key={index} 
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