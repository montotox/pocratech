// Traemos pokemones a nuestro pokedex
export const getPokemons = async () => {
  let offset = getRandonInt(0, 1113);
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=2&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Traemos la información de cada Pokemon
export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function getRandonInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
