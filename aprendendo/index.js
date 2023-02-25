const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?nome=NodeJS
//Route Params = /cursos/2
//Rquest Body = { nome: 'Nodejs', tipo: 'Backend' }

const cursos = ['Node JS', 'JavaScript', 'React Native'];

/*
server.get('/cursos', () => {
	console.log('Acessou a Rota!');
});
*/
/*
server.get('/cursos', (req, res) => {
	return res.send('Hello World!');
});
*/
/*
server.get('/cursos', (req, res) => {
	return res.json({ curso: 'Node JS' });
});
*/
/*
server.get('/cursos', (req, res) => {
	const nome = req.query.nome;
	return res.json({ curso: `Aprendendo ${nome}` });
});
*/
/*
server.get('/cursos/:id', (req, res) => {
	const id = req.params.id;
	return res.json({ curso: `Curso: ${id}` });
});
*/
//midlleware Global
server.use((req, res, next) => {
	console.log(`URL Chamada: ${req.url}`);
	return next();
});

function checkCurso(req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({ erro: 'Nome do curso é obrigatório' });
	}
	return next();
}

/*
function checkIndexCurso(req, res, next) {
	const curso = cursos[req.params.index];
	if (!curso) {
		return res.status(400).json({ error: 'O curso não existe' });
	}
	return next();
}
*/
function checkIndexCurso(req, res, next) {
	const curso = cursos[req.params.index];
	if (!curso) {
		return res.status(400).json({ error: 'O curso não existe' });
	}
	req.curso = curso;
	return next();
}
/*
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
	const { index }  = req.params;
	return res.json(cursos[index]);
});
*/
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
	return res.json(req.curso);
});

server.get('/cursos', (req, res) => {
	return res.json(cursos);
});

server.post('/cursos', checkCurso, (req, res) => { 
	const { name } = req.body;
	cursos.push(name);

	return res.json(cursos);
});

server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => { 
	const { index } = req.params;
	const { name } = req.body;
	cursos[index] = name;

	return res.json(cursos);
});

server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
	const { index } = req.params;
	cursos.splice(index, 1);

	return res.json({ message: 'Curso deletado com sucesso!' });
});


server.listen(4000); 