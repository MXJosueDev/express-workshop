const express = require('express');
const app = express();

const { pokemon } = require('./pokedex.json');

/*
Métodos HTTP

GET
POST
PATCH
PUT
DELETE
*/

app.get('/', (req, res, next) => {
	res.status(200);
	res.send('Bienvenido al Pokedex');
});

app.get('/pokemon/all', (req, res, next) => {
	res.status(200);
	res.send(pokemon);
});

// Aqui le pasé directamente una expresion regular, porque en express v5 reservaron algunos caracteres en los paths
// https://expressjs.com/2024/10/15/v5-release.html#no-more-regex
app.get(/^\/pokemon\/([0-9]{1,3})$/, (req, res, next) => {
	const id = req.params.id - 1; // el offset

	if (!(id >= 0 && id <= pokemon.length - 1)) {
		res.status(404);
		res.send('Pokemon no encontrado');

		return;
	}

	res.status(200);
	res.send(pokemon[id]);
});

app.get('/pokemon/:name', (req, res, next) => {
	let name = req.params.name;

	// no use el for para mas corto
	const pk = pokemon.find(pk => pk.name == name);

	if (!pk) {
		res.status(404);
		res.send('Pokemon no encontrado');

		return;
	}

	res.status(200);
	res.send(pk);
});

app.listen(process.env.port || 3000, () => {
	console.log('Server is running...');
});
