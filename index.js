const express = require('express');
const app = express();

/*
Métodos HTTP

GET
POST
PATCH
PUT
DELETE
*/

app.listen(3000, () => {
	console.log('Server is running...');
});

app.get('/', (req, res, next) => {
    res.status(200);
	res.send('Hola mundo');
});
