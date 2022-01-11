import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import Navigation from "./routes/Navigation";

import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthProvider } from "./context/UserContext";
import { getPokemons, getPokemonData, getPokemonData2 } from "./services/api";
import { CardPoke } from "./components/CardPoke/CardPoke";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [decodeToken, setDecodeToken] = useState({});
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  console.log(trigerPokedex);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPokemons();
    getTokenLocalStorage();
    getPokemonData2();
  }, [trigerPokedex]);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      console.log("data:", data);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);

      console.log(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokeId = async (id) => {
    const result = await getPokemonData2(id);
    setPokemon(result);
    setOpen(true);
  };

  // Simulamos que traemos información del usuario
  const userData = {
    username: "Ricardo",
    school: "Socratech",
    year: 2021,
  };

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

  return (
    <AuthProvider>
      {!token ? <Auth /> : <Navigation />}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {!isLoading ? <CardPoke pokemon={pokemon} /> : null}
          </Box>
        </Modal>
      </div>
    </AuthProvider>
  );
}

export default App;
