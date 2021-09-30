import s from './style.module.css';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './components/PlayerBoard';
import ArrowChoice from './components/ArrowChoice';
import Result from './components/Result';
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectGame , gameMethods} from '../../../../store/game';
import { useDispatch } from 'react-redux';

const counterWin = (board, player1, player2 ) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(element => {
        if(element.card?.possession === 'red')
            player2Count++;
        if(element.card?.possession === 'blue')
            player1Count++;
    });

    return [player1Count, player2Count];
}

const BoardPage = () => {
    const gameContext = useSelector(selectGame);
    const dispatch = useDispatch();
    const history = useHistory();
    const [board,setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => Object.values(gameContext.player1).map(item=>({...item, possession:'blue'})));
    const [player2,setPlayer2] = useState([]);
    const [step,setStep] = useState(0);
    const [chosenCard, setChosenCard] = useState(null);
    const [result, setResult] = useState(null);

    const getTurn = (currentTurn) => {
        if(currentTurn !== undefined){
            return ((currentTurn%2) + 1);
        }
        if(Math.random() > 0.5)
            return 1;
        else
            return 2;
    }
    
    const [turn, setTurn] = useState(getTurn(undefined));
    const cards = gameContext.player1;

    if(Object.keys(cards).length === 0)
        history.replace('/game');

    useEffect( () => {   
        async function getResponse () {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const boardRequest = await boardResponse.json();
            setBoard(boardRequest.data);

            const palyer2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            const palyer2Request = await palyer2Response.json();
            setPlayer2(palyer2Request.data.map(item=>({...item, possession:'red'})));

            dispatch(gameMethods.player2Set(palyer2Request.data.map(item=>({...item}))));
        };
        getResponse();


        /* return () => {
            gameContext.clean(); 
        }*/
    }, []);
    const handleClickBoardPlate = async (position) =>{
        if(chosenCard && chosenCard.player === turn)
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
            setTurn(prevState => { const newTurn = getTurn(prevState); return newTurn;});

        }
    }
    useEffect( () => {
        async function getResult(){
            if (step === 9)
            {
                const [count1, count2] = counterWin(board,player1,player2);
                let caption = '';
                if(count1>count2)
                {
                    dispatch(gameMethods.setWinner(1));
                    caption ='win';
                }
                else if (count2 > count1)
                {
                    dispatch(gameMethods.setWinner(2));
                    caption='lose';
                }
                else
                {
                    dispatch(gameMethods.setWinner(0));
                    caption = 'draw';
                }
                setResult(caption);
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                await sleep(4000);
                history.push('/game/finish');
            };
        }
        getResult();
    },[step]);
    const chooseCard = (card) => {
        if( card.player === turn)
        {
            setChosenCard(card)
            return true;
        }
        return false;
    }
    return (
        <div className={s.root}>
            <Result type={result} />
            <ArrowChoice side={turn} />
            <div className={s.playerOne}>
                    <PlayerBoard player={1} cards={player1} onCardChosen={ chooseCard}  />
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
                <PlayerBoard player={2} cards={player2} onCardChosen={ chooseCard} />
            </div>
        </div>
    );
};

export default BoardPage;