import { useHistory } from "react-router-dom";

const GamePage = ({onPageChange}) =>{
    const history = useHistory();
    const onClickButton = () =>{
        history.push('/home');
    }
    return(
        <div>
            <h1>This is empty game page!</h1>
            <button onClick={onClickButton}>
                Home
            </button>
        </div>
    )
}

export default GamePage;