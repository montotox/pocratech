import { useEffect, useState, useContext } from "react";
import Auth from "./pages/Auth";
import Navigation from "./routes/Navigation";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthProvider } from "./context/UserContext";

function App() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  const TOKEN = "token";

  const getTokenLocalStorage = () => {
    const tokenLocal = localStorage.getItem(TOKEN);
    setToken(tokenLocal);
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

  // if (token === undefined) return null;

  return (
    <AuthProvider>
      {!token ? <Auth setToken={setToken} /> : <Navigation logout={logout} />}
    </AuthProvider>
  );
}

export default App;
