import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';

const GamePage = () => {
    const match = useRouteMatch();
    /* const [player1Pokemons, setChosenPokemons] = useState({});

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
    const [winner,setWinner] = useState(0); */
    return (
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
    );
};

export default GamePage;