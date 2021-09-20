import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../contexts/PokemonContext';

const GamePage = () => {
    const match = useRouteMatch();
    const choosenPokemons = [];
    const pushPokemonToGame = (item) => {
        console.log('add pokemon to game', item );
        choosenPokemons.push(item);
        console.log(choosenPokemons);
    }
    return (
        <PokemonContext.Provider value={{
            pokemons : choosenPokemons,
            onPokemonAdd : pushPokemonToGame
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