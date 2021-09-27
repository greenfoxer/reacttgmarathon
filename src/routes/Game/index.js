import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../contexts/PokemonContext';
import {useState} from 'react';

const GamePage = () => {
    const match = useRouteMatch();
    const [player1Pokemons, setChosenPokemons] = useState({});

    const [player2Pokemons, setPlayer2Pokemons] = useState([]);
    const pushPokemonToGame = (key, item) => {
        setChosenPokemons( prevState =>{
            if (prevState[key])
            {
                const copyState = {...prevState};
                delete copyState[key];
                return copyState;
            }
            return { ...prevState, [key] : item}
        });
    }
    const player2SetPokemons = (deck) => {
        setPlayer2Pokemons(prevState => deck);
    }
    const cleanPokemons = () => {
        setChosenPokemons(prevstate => { return Object(); })
        setPlayer2Pokemons(prevState => { return []; });
    };
    const [winner,setWinner] = useState(0);
    return (
        <PokemonContext.Provider value={{
            player1 : player1Pokemons,
            player2 : player2Pokemons,
            onPokemonAdd : pushPokemonToGame,
            player2Set : player2SetPokemons,
            clean : cleanPokemons,
            winner : winner,
            setWinner : setWinner
        }
        }>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;