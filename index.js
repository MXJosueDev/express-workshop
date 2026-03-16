const morgan = require("morgan");
const express = require("express");
const app = express();
const pokemon = require("./routes/pokemon");

/*
Métodos HTTP

GET
POST
PATCH
PUT
DELETE
*/

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", pokemon);

app.get("/", (req, res, next) => {
  return res.status(200).send("Bienvenido al Pokedex");
});

app.listen(process.env.port || 3000, () => {
  console.log("Server is running...");
});
