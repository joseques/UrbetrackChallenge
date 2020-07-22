var express = require('express');
var cors = require('cors');
var app = express();
const password = "123456";

app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
	res.send('Hire me! I could be useful for Urbetrack :)');
});

app.post('/login', function (req, res) {
	if(req.body.password == password){
		res.status(200).send();
	} else {
		res.status(403).send();
	}
});

app.listen(1337, function () {
	console.log('Urbetack login service is started and listening on port 1337');
});