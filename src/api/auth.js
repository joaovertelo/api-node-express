const jwt = require('jsonwebtoken');

module.exports = (router) => {
	const login = (req, res) => {
		const { user, pwd } = req.body;
		if (user == "admin" && pwd === "admin") {
			//auth success
			const token = jwt.sign({ user: 'admin' }, process.env.SECRET, { expiresIn: '3d' });
			res.status(200).send({ auth: true, token });
		} else {
			res.status(500).send("Login inválido")
		}
	};

	router.post('/login', login);

	router.get('/logout', (req, res) => {
		res.status(200).send({ auth: false, token: null });
	});

	router.post('/register', function (req, res) {
		res.status(200).send({ auth: true, token: 'token' });
	});

	return router;
};
