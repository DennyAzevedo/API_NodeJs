const express = require('express');

const server = express();

server.use(express.json()); // para o express entender JSON - só colocar quando formos criar um CRUD

/*
criar o listen, mas ele vai ser o último comando do arquivo
*/

//inicialmente rodar sem o nodemon, apenas com node index.js

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

//Query params = ?nome=NodeJS
//Route Params = /cursos/2
//Request Body = { nome: 'Nodejs', tipo: 'Backend' }

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

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// instalar o nodemon
// npm install nodemon -D
// npm run dev
// mostrar como funciona o nodemon

// vamos criar um CRUD

// Read - todos os cursos

server.get('/cursos', (req, res) => {
	return res.json(cursos);
});


// Read - ler um curso
/*
server.get('/cursos/:id', (req, res) => {
	const id = req.params.id;
	return res.json({ curso: `Curso: ${id}` });
});
*/

// Create - criar um curso
/*
server.post('/cursos', checkCurso, (req, res) => {
	const { name } = req.body;
	cursos.push(name);

	return res.json(cursos);
});
*/

// Update - atualizar um curso
/*
server.put('/cursos/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	cursos[id] = name;

	return res.json(cursos);
});
*/

// Delete - deletar um curso
/*
server.delete('/cursos/:id', (req, res) => {
	const { id } = req.params;
	cursos.splice(id, 1);

	return res.json({ message: 'Curso deletado com sucesso!' });
});
*/

//midlleware Global
/*
server.use((req, res) => {
	console.log('Requisição Chamada'); // toda vez que uma requisição for chamada, ele vai mostrar no console
});
*/

server.use((req, res, next) => {
	console.log(`URL Chamada: ${req.url}`);
	return next();
});

// criar um middleware para verificar se o nome do curso foi passado

function checkCurso(req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({ erro: 'Nome do curso é obrigatório' });
	}
	return next();
}

// novo post usando o middleware

server.post('/cursos', checkCurso, (req, res) => {
	const { name } = req.body;
	cursos.push(name);

	return res.json(cursos);
});


// novo put usando o middleware
/*
server.put('/cursos/:id', checkCurso, (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	cursos[id] = name;

	return res.json(cursos);
});
*/
// mostrar o erro de não ter o nome do curso
// mostrar que id não existente não dá erro
// criar um middleware para verificar se o id do curso existe

/*
function checkIdCurso(req, res, next) {
	const curso = cursos[req.params.id];
	if (!curso) {
		return res.status(400).json({ error: 'O id informado não existe' });
	}
	return next();
}
*/

// novo get usando o middleware de verificação de id
/*
server.get('/cursos/:id', checkIdCurso, (req, res) => {
	const { id }  = req.params;
	return res.json(cursos[id]);
});
*/

// novo put usando o middleware de verificação de id

server.put('/cursos/:id', checkCurso, checkIdCurso, (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	cursos[id] = name;

	return res.json(cursos);
});

// mostrar que o put não dá erro se o id não existir
// novo delete usando o middleware de verificação de id

server.delete('/cursos/:id', checkIdCurso, (req, res) => {
	const { id } = req.params;
	cursos.splice(id, 1);

	return res.json({ message: 'Curso deletado com sucesso!' });
});

// mostrar que o delete não dá erro se o id não existir
// Ajustar o middleware de verificação de id para retornar o curso para o proximo elemento da cadeia

function checkIdCurso(req, res, next) {
	const curso = cursos[req.params.id];
	if (!curso) {
		return res.status(400).json({ error: 'O curso não existe' });
	}
	req.curso = curso;
	return next();
}

// novo get usando o middleware de verificação de id que retorna o curso

server.get('/cursos/:id', checkIdCurso, (req, res) => {
	return res.json(req.curso);
});

server.listen(4000);