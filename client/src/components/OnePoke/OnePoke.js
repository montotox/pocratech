import React from "react";

export const OnePoke = ({ pokemon, handleClick }) => {
  //   console.log("Pokemon", pokemon);
  return (
    <div onClick={() => handleClick(pokemon)}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} />
    </div>
  );
};
