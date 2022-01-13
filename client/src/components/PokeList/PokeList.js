import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPokemonDataID } from "../../services/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { CardPoke } from "../components/CardPoke/CardPoke";
import { OnePoke } from "../OnePoke/OnePoke";

export default function PokeList({ user_id }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPokemonsIds();
  }, [pokemons]);

  useEffect(() => {
    setIsLoading(!isLoading);
  }, [pokemons]);

  const getPokemonsIds = () => {
    axios
      .get(`http://localhost:4000/pokemon/${user_id}`, {})
      .then((response) => {
        console.log("Lista de pokemones DB", response.data.result);
        setPokemonList(response.data.result);
        fetchPokemonsID();
      });
  };

  const fetchPokemonsID = async () => {
    const promises = pokemonList.map(async (pokemon) => {
      console.log(pokemon);
      return await getPokemonDataID(pokemon.pokemon_id);
    });
    const result = await Promise.all(promises);
    console.log("Lista pokemones detallada ANTES:", pokemons);
    setPokemons(result);
    console.log("Lista pokemones detallada DESPUES:", pokemons);
  };

  return (
    <div>
      {isLoading && pokemons ? (
        "Cargando.."
      ) : (
        <div>
          {pokemons.map((pokemon, idx) => {
            console.log(pokemon);
            return <OnePoke pokemon={pokemon} key={idx} />;
          })}
        </div>
      )}

      {/* <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {!isLoading ? <CardPoke pokemon={pokemonSelected} /> : null}
          </Box>
        </Modal>
      </div> */}
    </div>
  );
}
