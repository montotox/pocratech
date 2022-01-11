import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
// import UserContext from "./context/UserContext";
import { AuthProvider } from "./context/UserContext";
import { getPokemons, getPokemonData, getPokemonData2 } from "./services/api";
import PokeCard from "./components/PokeCard";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";
import { CardPoke } from "./components/CardPoke/CardPoke";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [decodeToken, setDecodeToken] = useState({});
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
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
  // Register user
  // const newUser = () => {
  //   axios
  //     .post("http://localhost:4000/users/saveUser", {
  //       name: "Pocha",
  //       user_name: "pochita",
  //       password: "123",
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  const TOKEN = "token";
  // Login user
  //localhost:4000/users/login
  // const loginUser = () => {
  //   axios
  //     .post("http://localhost:4000/users/login", {
  //       user_name: "pochita",
  //       password: "123",
  //     })
  //     .then((response) => {
  //       setDecodeToken(jwtDecode(response.data.token));
  //       console.log(jwtDecode(response.data.token));
  //       localStorage.setItem(TOKEN, response.data.token);
  //       setToken(localStorage.getItem(TOKEN));
  //     });
  // };

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
      <div className="App">
        <button onClick={() => setTrigerPokedex(!trigerPokedex)}>
          Descubre Pokemones
        </button>
        {/* <button onClick={newUser}>Crear usuarios</button>
        <button onClick={loginUser}>Login usuarios</button> */}
        <button onClick={logout}>Cerrar sesión</button>

        {pokemons.map((pokemon, idx) => {
          return (
            <div key={idx}>
              <p>{pokemon.name}</p>
              <button onClick={() => newPokemon(pokemon.id)}>
                Agregar pokemon
              </button>
              <button onClick={() => getPokeId(pokemon.id)}>
                Ver Detalles
              </button>
            </div>
          );
        })}

        <PokeCard />
        {token ? "Bieeeeeeeeen!" : "Mal"}

        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

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
