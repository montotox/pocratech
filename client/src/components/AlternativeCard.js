import React from "react";

export default function AlternativeCard(props) {
  const { pokemon } = props;
  console.log(pokemon[0].stats[0].base_stat);
  const hp = pokemon[0].stats[0].base_stat;
  return (
    <div>
      <h1>Nombre del pokemon</h1>
      {pokemon.map((pokemon, idx) => {
        return (
          <div key={idx}>
            <img src={pokemon.sprites.front_default} />
            <h4> Pokemon: {pokemon.name}</h4>
            <span>Vida: {hp}</span>
          </div>
        );
      })}
    </div>
  );
}
