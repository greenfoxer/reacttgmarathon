import s from './style.module.css';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../contexts/PokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './components/PlayerBoard';

const counterWin = (board, player1, player2 ) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(element => {
        if(element.card.possession === 'red')
            player2Count++;
        if(element.card.possession === 'blue')
            player1Count++;
    });

    return [player1Count, player2Count];
}

const BoardPage = () => {
    
    const gameContext = useContext(PokemonContext);
    const history = useHistory();
    const [board,setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => Object.values(gameContext.pokemons).map(item=>({...item, possession:'blue'})));
    const [player2,setPlayer2] = useState([]);
    const [step,setStep] = useState(0);
    const [chosenCard, setChosenCard] = useState(null);
    const cards = gameContext.pokemons;

    if(Object.keys(cards).length === 0)
        history.replace('/game');

    useEffect( async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);

        const palyer2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const palyer2Request = await palyer2Response.json();
        setPlayer2(palyer2Request.data.map(item=>({...item, possession:'red'})));


        return () => {
            gameContext.clean();
        }
    }, []);
    const handleClickBoardPlate = async (position) =>{
        if(chosenCard)
        {
            const params = { position, card:chosenCard, board };
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            setBoard(request.data);

            if(chosenCard.player === 1)
                setPlayer1(prevState => prevState.filter(t=>t.id !== chosenCard.id));

            if(chosenCard.player === 2)
                setPlayer2(prevState => prevState.filter(t=>t.id !== chosenCard.id));

            setStep(prevState => { const count =prevState +1 ; return count;})
        }
    }
    useEffect(() =>{
        if (step === 9)
        {
            const [count1, count2] = counterWin(board,player1,player2);
            console.log(count1, count2);
            if(count1>count2)
            {
                alert('WIN');
            }
            else if (count2 > count1)
            {
                alert('LOSE');
            }
            else
            {
                alert('DRAW');
            }
        }
    },[step]);
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                {
                    <PlayerBoard player={1} cards={player1}
                        onCardChosen={ (card) => setChosenCard(card)}
                    />
                }
            </div>
            <div className={s.board}>
                {
                    board.map( item => (
                        <div key={item.position}
                        className={s.boardPlate} 
                        onClick={ () => { !item.card && handleClickBoardPlate(item.position);}}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard player={2} cards={player2} onCardChosen={ (card) => setChosenCard(card)} />
            </div>
        </div>
    );
};

export default BoardPage;