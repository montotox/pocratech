import React from "react";
import "./OnePoke.scss";

export const OnePoke = ({ pokemon, handleClick }) => {
  //   console.log("Pokemon", pokemon);
  return (
    <div
      onClick={() => handleClick(pokemon)}
      className={`color-${pokemon.types[0].type.name}`}
    >
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} />
    </div>
  );
};
