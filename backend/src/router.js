//const { Router } = require('express');
import { Router } from 'express';
import SessionController from './controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

//module.exports = routes;
export default routes;