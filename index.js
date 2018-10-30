const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(bodyParser.text());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.use(expressJWT({ secret: 'string de secret' }).unless({ path: [ '/api/login', '/api/register' ] }));

const authAPI = require('./src/api/auth');
const userAPI = require('./src/api/users');

router.use((req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, 'string de secret', (err, decoded) => {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
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

authAPI(router);
userAPI(router);

app.use('/api', router);

app.listen(3000, () => {
	console.log('Rodando na porta 3000...');
});
