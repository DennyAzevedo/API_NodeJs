//const express = require('express');
//const routes = require('./router');
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './router';

class App{
	constructor() {
		this.server = express();
		mongoose.connect('mongodb+srv://denny:Me109G6@devhouse.szwp0kw.mongodb.net/?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'uploads')),
		);
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}
}

//module.exports = new App().server;
export default new App().server;