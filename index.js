const morgan = require("morgan");
const express = require("express");
const app = express();
const pokemon = require("./routes/pokemon");
const user = require("./routes/user");
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");

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

app.get("/", index);

app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);

app.listen(process.env.port || 3000, () => {
  console.log("Server is running...");
});
