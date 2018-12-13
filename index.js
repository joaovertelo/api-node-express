require("dotenv-safe").load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(bodyParser.text());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


app.use(expressJWT({ secret: process.env.SECRET }).unless({ path: ['/api/login', '/api/register'] }));

const authAPI = require('./src/api/auth');
const userAPI = require('./src/api/users');

authAPI(router);

router.use((req, res, next) => {
	var token = req.headers.authorization || req.headers['x-access-token'];
	console.log(token)
	if (token) {
		jwt.verify(token.split(" ")[1], process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(500).send({ success: false, message: "Failed to authenticate token." });
			} else {
				req.decoded = decoded;
				console.log(req.decoded)
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
		//next();
	}
});

userAPI(router);

app.use('/api', router);

app.listen(3000, () => {
	console.log('Rodando na porta 3000...');
});
