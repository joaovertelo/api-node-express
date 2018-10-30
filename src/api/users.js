module.exports = (router) => {
	const buscar = (req, res) => {
		res.json({ nome: 'Joao' });
	};

	router.get('/users', buscar);
	return { buscar };
};
