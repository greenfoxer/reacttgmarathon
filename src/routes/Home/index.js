import React from 'react';

import Header from './../../components/Header';
import Layout from './../../components/Layout';
import PokemonCard from './../../components/PokemonCard';

import BgImage from './../../Assets/bg3.jpg';

import POKEMONS from './../../PokeDB.json';

const HomePage = ({onPageChange}) =>{
  const  handleClickButton = (page) => {
    onPageChange && onPageChange(page);
  };
  return (
    <React.Fragment>
      <Header title="Pokemon Card Game Project" 
              descr="My first React application"
              onClickButton={handleClickButton}/>
      <Layout title="Rules" descr="My Layout Description 1" urlBg={BgImage}>
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
        <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
        
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
      </Layout>
      <Layout title="Pokemons" descr="My Layout Description 2" colorBg="SkyBlue">
        <div className="flex">
          {
            POKEMONS.map(item => <PokemonCard key={item.id} id={item.id} name={item.name} type={item.type} img={item.img} values={item.values} isActive={true}/>)
          }
        </div>
      </Layout>
      <Layout title="About" descr="One day..." urlBg={BgImage}/>
    </React.Fragment>
  );
}

export default HomePage;
