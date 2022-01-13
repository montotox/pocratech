import React, { useEffect, useState, useContext } from "react";
import { OnePoke } from "../components/OnePoke/OnePoke";
import { getPokemonData, getPokemons } from "../services/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CardPoke } from "../components/CardPoke/CardPoke";
import { AuthContext } from "../context/UserContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(AuthContext);
  const { dataAuth } = context;
  useEffect(() => {
    AllPokemons();
  }, []);

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

  const handleClose = () => setOpen(false);

  const AllPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
    } catch (error) {
      console.log("AllpokemonsHome", error);
    }
  };
  const handleClick = (pokemon) => {
    setPokemonSelected(pokemon);
    setIsLoading(false);
    setOpen(true);
  };
  //Ingresar a los datos de usuario mediante el Token en LocalStorage
  const tokenLocal = localStorage.getItem("token");
  const decodeToken = jwtDecode(tokenLocal);
  const { user } = decodeToken;
  console.log("IngresamosconPuntos", decodeToken.user.id);
  console.log("Destructuring", user.id);
  //Ingresar a los datos de usuario mediante context
  console.log("ContextUserID", dataAuth.auth.user_id);

  const savePokemon = (pokemonID) => {
    //Se resuelve mediante context
    const userID = dataAuth.auth.user_id;
    axios
      .post(`http://localhost:4000/pokemon/${userID}/${pokemonID}`, {})
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <div>
        {pokemons.map((pokemon, idx) => {
          return (
            <OnePoke pokemon={pokemon} key={idx} handleClick={handleClick} />
          );
        })}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {!isLoading ? (
              <CardPoke
                pokemon={pokemonSelected}
                savePokemon={savePokemon}
                isLanding="home"
              />
            ) : null}
          </Box>
        </Modal>
      </div>
    </div>
  );
}
