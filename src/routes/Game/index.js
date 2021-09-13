const GamePage = ({onPageChange}) =>{
    const onClickButton = () =>{
        onPageChange && onPageChange('app');
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