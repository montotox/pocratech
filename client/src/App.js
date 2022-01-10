import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
// import UserContext from "./context/UserContext";
import { AuthProvider } from "./context/UserContext";
import { getPokemons, getPokemonData } from "./services/api";
import PokeCard from "./components/PokeCard";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/LoginForm";

function App() {
  const [trigerPokedex, setTrigerPokedex] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [decodeToken, setDecodeToken] = useState({});
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  console.log(trigerPokedex);

  useEffect(() => {
    fetchPokemons();
    getTokenLocalStorage();
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
    </AuthProvider>
  );
}

export default App;
