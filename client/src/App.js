import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { getPokemons, getPokemonData } from "./services/api";
import PokeCard from "./components/PokeCard";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  console.log(trigerPokedex);
  useEffect(() => {
    fetchPokemons();
  }, [trigerPokedex]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  // Simulamos que traemos información del usuario
  const userData = {
    username: "Ricardo",
    school: "Socratech",
    year: 2021,
  };

  const newUser = () => {
    axios
      .post("localhost:4000/users/saveUser", {
        name: "Pocha",
        user_name: "pochita",
        password: "123",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <button onClick={() => setTrigerPokedex(!trigerPokedex)}>
          Descubre Pokemones
        </button>
        <button onClick={newUser}>Crear usuarios</button>
        {pokemons.map((pokemon, idx) => {
          return <p key={idx}>{pokemon.name}</p>;
        })}
        <PokeCard />
      </div>
    </UserContext.Provider>
  );
}

export default App;
