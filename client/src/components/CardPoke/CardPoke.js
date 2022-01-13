import React from "react";

export const CardPoke = ({
  pokemon,
  savePokemon,
  isLanding,
  removePokemon,
}) => {
  console.log("prop", pokemon);

  const porcent = (stat) => {
    const max = 255;
    return (stat / max) * 100;
  };

  return (
    <div className={`color-${pokemon.types[0].type.name}`}>
      <h1>CardPoke</h1>

      {isLanding == "home" ? (
        <button onClick={() => savePokemon(pokemon.id)}>Agregar Pokemon</button>
      ) : (
        <button onClick={() => removePokemon(pokemon.id)}>
          Eliminar Pokemon
        </button>
      )}

      <div>
        <h3>{pokemon.name}</h3>
        <h4>{pokemon.id}</h4>
        <img src={pokemon.sprites.front_default} />
        <div>
          {pokemon.types.map((type, idx) => {
            return (
              <div
                key={idx}
                className={`color-${pokemon.types[idx].type.name}`}
              >
                <p>{type.type.name}</p>
              </div>
            );
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
                {stat.stat.name} : {stat.base_stat}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
