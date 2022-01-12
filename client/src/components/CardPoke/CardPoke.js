import React from "react";

export const CardPoke = ({ pokemon }) => {
  console.log("prop", pokemon);

  const porcent = (stat) => {
    const max = 255;

    return (stat / max) * 100;
  };

  return (
    <div>
      <h1>CardPoke</h1>
      <div>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.front_default} />
        <div>
          {pokemon.types.map((pokemon, idx) => {
            return <p key={idx}>Type: {pokemon.type.name}</p>;
          })}
        </div>
        <div>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight} </p>
        </div>
        <ul>
          Moves:{" "}
          {pokemon.moves.slice(0, 3).map((item, idx) => {
            return <li key={idx}>{item.move.name}</li>;
          })}
        </ul>
        {pokemon.stats.map((stat, idx) => {
          return (
            <div key={idx}>
              <p>
                {stat.stat.name} : {porcent(stat.base_stat)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
