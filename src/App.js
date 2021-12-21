import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import { getPokemons, getPokemonData } from "./services/api";

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
  };

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <button onClick={() => setTrigerPokedex(!trigerPokedex)}>
          Descubre Pokemones
        </button>
        {pokemons.map((pokemon, idx) => {
          return <p key={idx}>{pokemon.name}</p>;
        })}
      </div>
    </UserContext.Provider>
  );
}

export default App;
