const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", (req, res, next) => {
  return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next) => {
  const pk = await db.query("SELECT * FROM pokemon;");
  return res.status(200).json(pk);
});

// Aqui le pasé directamente una expresion regular, porque en express v5 reservaron algunos caracteres en los paths
// https://expressjs.com/2024/10/15/v5-release.html#no-more-regex
pokemon.get(/^\/([0-9]{1,3})$/, async (req, res, next) => {
  const pk = await db.query("SELECT * FROM pokemon;");

  const id = req.params[0] - 1; // el offset
  console.log(pk.length);
  if (!(id >= 0 && id <= pk.length - 1)) {
    return res.status(404).send("Pokemon no encontrado");
  }

  return res.status(200).send(pk[id]);
});

pokemon.get(/^\/([A-Za-z]+)$/, async (req, res, next) => {
  const pk = await db.query("SELECT * FROM pokemon;");

  const name = req.params[0];

  // no use el for para mas corto
  const pkmn = pk.filter(pkmn => pkmn.pok_name.toUpperCase() == name.toUpperCase() && pkmn);

  return pkmn.length == 0
    ? res.status(404).send("Pokemon no encontrado")
    : res.status(200).send(pkmn);
});

module.exports = pokemon;
