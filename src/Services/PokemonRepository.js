import database from './firebase.js';

export const GetAllPokemons = (callBack) =>{
    return database.ref('pokemons').once('value', (snapshot) =>{
      callBack && callBack(snapshot.val());
    });
  }

  export const UpdatePokemonById = (id, update ) =>
  {
    database.ref('pokemons/'+ id).set(update);
  }

  export const AddNewPokemon = (pokemon) => {
    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set(pokemon);
  }