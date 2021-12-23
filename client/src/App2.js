import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import { getPokemons, getPokemonData } from "./services/api";
import PokeCard from "./components/PokeCard";
import axios from "axios";
import jwtDecode from "jwt-decode";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  console.log(trigerPokedex);
  useEffect(() => {
    fetchPokemons();
    let tokenGet = localStorage.getItem(TOKEN);
    console.log(tokenGet);
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
      .post("http://localhost:4000/users/saveUser", {
        name: "Ricardo",
        user_name: "pocha",
        password: "123",
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const TOKEN = "token";

  const loginUser = () => {
    axios
      .post("http://localhost:4000/users/login", {
        user_name: "pocha",
        password: "123",
      })
      .then((response) => {
        console.log(jwtDecode(response.data.token));
        localStorage.setItem(TOKEN, response.data.token);
      });
  };

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <button onClick={() => setTrigerPokedex(!trigerPokedex)}>
          Descubre Pokemones
        </button>
        <button onClick={newUser}>Crear usuario</button>
        <button onClick={loginUser}>Login usuario</button>
        {pokemons.map((pokemon, idx) => {
          return <p key={idx}>{pokemon.name}</p>;
        })}
        <PokeCard />
      </div>
    </UserContext.Provider>
  );
}

export default App;
