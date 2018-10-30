const jwt = require('jsonwebtoken');

module.exports = (router) => {
	const login = (req, res) => {
		const token = jwt.sign({ username: 'Joao' }, 'string de secret', { expiresIn: '3d' });
		res.status(200).send({ auth: true, token });
	};

	router.get('/login', login);

	router.get('/logout', (req, res) => {
		res.status(200).send({ auth: false, token: null });
	});

	router.post('/register', function(req, res) {
		res.status(200).send({ auth: true, token: 'token' });
	});

	return router ;
};
