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
import request from '../../../../Services/request';
import { selectCards } from '../../../../store/cards';

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
const returnBoard = (serv) =>{
    return serv.map((item ,index) => {
        let card = null;
        if(typeof item === 'object'){
            card = {
                ...item.poke,
                possession: item.holder === 'p1' ? 'blue' : 'red'
            };
        }
        return {
            position : index + 1,
            card,
        };
    })
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
    const [serverBoard, setServerBoard] = useState([0,0,0,0,0,0,0,0,0]);

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
    const [needP2Loading, setNeedP2Loading] = useState( turn === 2 && step === 0);
    const cards = gameContext.player1;

    if(Object.keys(cards).length === 0)
        history.replace('/game');

    useEffect( () => {   
        async function getResponse () {
            const boardRequest = await request.getBoard();
            setBoard(boardRequest.data);

            const player2Request = await request.gameStart({
                pokemons: Object.values(gameContext.player1)
            });
            setPlayer2(player2Request.data.map(item=>({...item, possession:'red'})));

            dispatch(gameMethods.player2Set(player2Request.data.map(item=>({...item}))));
        };
        getResponse();

        

        /* return () => {
            gameContext.clean(); 
        }*/
    }, []);
    useEffect(() => {
        async function startPlayer2 () {

                const params = {
                    currentPlayer: 'p2',
                    hands: {
                      p1: player1,
                      p2: player2
                    },
                    move: null,
                    board: serverBoard,
                  };

                  const game = await request.game(params);

                  if(game.move !== null){
                      const idAi = game.move.poke.id;
      
                      setTimeout( () =>{
                          setPlayer2(prevState => prevState.map(item => {
                              if(item.id === idAi){
                                  return {
                                      ...item,
                                      isSelected : true,
                                  }
                              }
                              return item;
                          }));
                      }, 1000);
      
                      setTimeout( () => {
                          setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                          setServerBoard(game.board);
                          setBoard(returnBoard(game.board));
                          setStep(prevState => { const count =prevState +1 ; return count;})
                          setTurn(prevState => { const newTurn = getTurn(prevState); return newTurn;});
                      }, 1500);
      
                  };
            
        };
        if(needP2Loading && player2.length !== 0)
        {
            setNeedP2Loading(false);
            startPlayer2();
        }
    },[player2]);

    const handleClickBoardPlate = async (position) =>{
        if(chosenCard !== null)
        {
            const params = { 
                currentPlayer : `p${turn}`,
                hands: {
                    p1: player1,
                    p2: player2,
                },
                move :{
                    poke : chosenCard,
                    position,
                },
                board : serverBoard};

            if(chosenCard.player === 1)
                setPlayer1(prevState => prevState.filter(t=>t.id !== chosenCard.id));

            setBoard(prevState => prevState.map(item => {
                if (item.position === position){
                    return{
                        ...item,
                        card: chosenCard,
                    }
                }
                return item;
            }))
            
            const game = await request.game(params);

            setBoard(returnBoard(game.oldBoard));

            setStep(prevState => { const count =prevState +1 ; return count;})
            setTurn(prevState => { const newTurn = getTurn(prevState); return newTurn;});

            if(game.move !== null){
                const idAi = game.move.poke.id;

                setTimeout( () =>{
                    setPlayer2(prevState => prevState.map(item => {
                        if(item.id === idAi){
                            return {
                                ...item,
                                isSelected : true,
                            }
                        }
                        return item;
                    }));
                }, 1000);

                setTimeout( () => {
                    setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                    setServerBoard(game.board);
                    setBoard(returnBoard(game.board));
                    setStep(prevState => { const count =prevState +1 ; return count;})
                    setTurn(prevState => { const newTurn = getTurn(prevState); return newTurn;});
                }, 1500);

            };
            setChosenCard(null);

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
            if(turn === 1)
                setPlayer1( prevState => prevState.map( item => {
                    if(item.id === card.id)
                        return{ 
                            ...item,
                            isSelected :true,
                        }
                        return {
                            ...item,
                            isSelected : false,
                        }
                }))
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
                                item.card && <PokemonCard {...item.card} isSelected={false} isActive minimize />
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