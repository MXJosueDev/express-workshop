const express = require("express");
const app = express();

const { pokemon } = require("./pokedex.json");

/*
Métodos HTTP

GET
POST
PATCH
PUT
DELETE
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).send("Bienvenido al Pokedex");
});

app.post("/pokemon", (req, res, next) => {
  return res.status(200).send(req.body);
});

app.get("/pokemon", (req, res, next) => {
  return res.status(200).send(pokemon);
});

// Aqui le pasé directamente una expresion regular, porque en express v5 reservaron algunos caracteres en los paths
// https://expressjs.com/2024/10/15/v5-release.html#no-more-regex
app.get(/^\/pokemon\/([0-9]{1,3})$/, (req, res, next) => {
  const id = req.params.id - 1; // el offset

  return !(id >= 0 && id <= pokemon.length - 1)
    ? res.status(404).send("Pokemon no encontrado")
    : res.status(200).send(pokemon[id]);
});

app.get(/^\/pokemon\/([A-Za-z]+)$/, (req, res, next) => {
  const name = req.params[0];

  // no use el for para mas corto
  const pk = pokemon.filter(pk => pk.name.toUpperCase() == name.toUpperCase() && pl);

  return pk.length == 0 ? res.status(404).send("Pokemon no encontrado") : res.status(200).send(pk);
});

app.listen(process.env.port || 3000, () => {
  console.log("Server is running...");
});
