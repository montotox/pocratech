import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import Navigation from "./routes/Navigation";

import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthProvider } from "./context/UserContext";
import { getPokemonData2 } from "./services/api";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    // setIsLoading(true);
    // fetchPokemons();
    getTokenLocalStorage();
    // getPokemonData2();
  }, [trigerPokedex]);

  // const getPokeId = async (id) => {
  //   const result = await getPokemonData2(id);
  //   setPokemon(result);
  //   setOpen(true);
  // };

  const TOKEN = "token";

  const getTokenLocalStorage = () => {
    setToken(localStorage.getItem(TOKEN));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setToken(null);
  };

  //localhost:4000/pokemon/:user_id/:pokemon_id

  // Guardar pokemon por usuario
  const newPokemon = (pokemonID) => {
    const decodeUser = jwtDecode(token);
    const userID = decodeUser.user.id;
    axios
      .post(`http://localhost:4000/pokemon/${userID}/${pokemonID}`, {})
      .then((response) => {
        console.log(response);
      });
  };

  return <AuthProvider>{!token ? <Auth /> : <Navigation />}</AuthProvider>;
}

export default App;
