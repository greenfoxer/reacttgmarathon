import firebase from "firebase/compat/app";
import 'firebase/compat/database' 

const firebaseConfig = {
    apiKey: "AIzaSyBpwM-_LN_TarR1NbNedA5hbeae-nmGaI4",  
    authDomain: "pokemon-game-ae7f6.firebaseapp.com",
      databaseURL: "https://pokemon-game-ae7f6-default-rtdb.europe-west1.firebasedatabase.app",  
    projectId: "pokemon-game-ae7f6",  
    storageBucket: "pokemon-game-ae7f6.appspot.com",  
    messagingSenderId: "550206869022",  
    appId: "1:550206869022:web:22af1539388769e285e80f"  
  };
  
  firebase.initializeApp(firebaseConfig);

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

  export const fire = firebase;
  export const database = fire.database();

  export default database;