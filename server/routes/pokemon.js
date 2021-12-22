var express = require("express");
var router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const verify = require("../middleware/verify");

//localhost:3000/pokemon/:user_id
router.get("/:user_id", verify, pokemonController.selectPokemonByUser);

//localhost:3000/pokemon/:user_id/:pokemon_id
router.post("/:user_id/:pokemon_id", verify, pokemonController.savePokemon);

//localhost:3000/pokemon/:pokemon_id
router.put("/:pokemon_id", verify, pokemonController.deletePokemon);

module.exports = router;
