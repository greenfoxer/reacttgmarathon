import s from './style.module.css';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../contexts/PokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './components/PlayerBoard';

const BoardPage = () => {
    
    const gameContext = useContext(PokemonContext);
    const history = useHistory();
    const [board,setBoard] = useState([]);
    const [player2,setPlayer2] = useState([]);
    const cards = gameContext.pokemons;

    /* if(Object.keys(cards).length === 0)
        history.replace('/game'); */

    useEffect( async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);

        const palyer2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const palyer2Request = await palyer2Response.json();
        setPlayer2(palyer2Request.data);


        return () => {
            gameContext.clean();
        }
    }, []);
    const handleClickBoardPlate = (pos) =>{
        console.log(pos);
    }
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                {
                Object.values(cards).map( (item) => <PokemonCard key={item.id}
                    id={item.id} name={item.name} type={item.type} img={item.img} values={item.values}
                    isActive minimize={true} className={s.card}

                />)}
            </div>
            <div className={s.board}>
                {
                    board.map( item => (
                        <div key={item.position}
                        className={s.boardPlate} 
                        onClick={ () => { !item.card && handleClickBoardPlate(item.position);}}
                        >
                            {
                                item.card && <PokemonCard {...item} minimize />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard cards={player2}/>
            </div>
        </div>
    );
};

export default BoardPage;