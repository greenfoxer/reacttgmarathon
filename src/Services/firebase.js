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

  class Firebase{

    constructor() {
      this.fire = firebase;
      this.database = this.fire.database();
    }

    GetPokemonSocket = (callBack) => {
      this.database.ref('pokemons').on('value', snapshot => {
        callBack && callBack(snapshot.val());
      });
    }

    OffPokemonSocket = () => {
      this.database.ref('pokemons').off();
    }

    GetAllPokemons = async () =>{
      return await this.database.ref('pokemons').once('value').then( snapshot => snapshot.val());
    }

    UpdatePokemonById = (id, update ) =>
    {
      this.database.ref('pokemons/'+ id).set(update);
    }

    AddNewPokemon = (pokemon, callback) => {
      const newKey = this.database.ref().child('pokemons').push().key;
      this.database.ref('pokemons/' + newKey).set(pokemon).then( () => { callback && callback() });
    }
  }

  const FirebaseClass = new Firebase();

  export default FirebaseClass;