import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import UserContext from "./context/UserContext";
import { getPokemons, getPokemonData } from "./services/api";
import PokeCard from "./components/PokeCard";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [decodeToken, setDecodeToken] = useState({});
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
  // Register user
  const newUser = () => {
    axios
      .post("http://localhost:4000/users/saveUser", {
        name: "Pocha",
        user_name: "pochita",
        password: "123",
      })
      .then((response) => {
        console.log(response);
      });
  };

  const TOKEN = "token";
  // Login user
  const loginUser = () => {
    axios
      .post("http://localhost:4000/users/login", {
        user_name: "pochita",
        password: "123",
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        console.log(jwtDecode(response.data.token));
        setDecodeToken(jwtDecode(response.data.token));
        localStorage.setItem(TOKEN, response.data.token);
      });
  };

  console.log("DecodeToken", decodeToken.user.name);

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <button onClick={() => setTrigerPokedex(!trigerPokedex)}>
          Descubre Pokemones
        </button>
        <button onClick={newUser}>Crear usuarios</button>
        <button onClick={loginUser}>Login usuarios</button>
        {pokemons.map((pokemon, idx) => {
          return <p key={idx}>{pokemon.name}</p>;
        })}
        <PokeCard />
      </div>
    </UserContext.Provider>
  );
}

export default App;
