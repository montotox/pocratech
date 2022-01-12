import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { OnePoke } from "../components/OnePoke/OnePoke";
import { getPokemonData, getPokemons } from "../services/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CardPoke } from "../components/CardPoke/CardPoke";

export default function Home() {
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
  const [pokemons, setPokemons] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AllPokemons();
  }, []);
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
    console.log("pocha", pokemon);

    setPokemonSelected(pokemon);
    setIsLoading(false);
    setOpen(true);
  };

  return (
    <div>
      <Navbar />
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
            {!isLoading ? <CardPoke pokemon={pokemonSelected} /> : null}
          </Box>
        </Modal>
      </div>
    </div>
  );
}
