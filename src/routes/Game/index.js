import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../contexts/PokemonContext';
import {useState} from 'react';

const GamePage = () => {
    const match = useRouteMatch();
    const [choosenPokemons, setChosenPokemons] = useState({});
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
    const cleanPokemons = () => {
        setChosenPokemons(prevstate => { return Object(); })
    };
    return (
        <PokemonContext.Provider value={{
            pokemons : choosenPokemons,
            onPokemonAdd : pushPokemonToGame,
            clean : cleanPokemons
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