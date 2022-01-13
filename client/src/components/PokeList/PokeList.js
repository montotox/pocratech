import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPokemonDataID } from "../../services/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CardPoke } from "../CardPoke/CardPoke";
import { OnePoke } from "../OnePoke/OnePoke";

export default function PokeList({ user_id }) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listPokemon, setListPokemon] = useState(true);
  useEffect(() => {
    getPokemonsIds();
  }, [listPokemon]);

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

  const getPokemonsIds = () => {
    axios
      .get(`http://localhost:4000/pokemon/${user_id}`, {})
      .then((response) => {
        const data = response.data.result;
        fetchPokemonsID(data);
      });
  };

  const fetchPokemonsID = async (data) => {
    try {
      const promises = data.map(async (pokemon) => {
        return await getPokemonDataID(pokemon.pokemon_id);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (pokemon) => {
    setPokemonSelected(pokemon);
    setIsLoading(false);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const removePokemon = (pokemonID) => {
    axios.put(`http://localhost:4000/pokemon/${pokemonID}`).then((response) => {
      console.log(response);
      setListPokemon(!listPokemon);
      setOpen(false);
    });
  };

  return (
    <div>
      <div>
        {pokemons.map((pokemon, idx) => {
          console.log(pokemon);
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
                isLanding="user"
                removePokemon={removePokemon}
              />
            ) : null}
          </Box>
        </Modal>
      </div>
    </div>
  );
}
