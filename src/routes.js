const express = require('express');
const routes = express.Router();
const ClientController = require('./controllers/ClientController');

routes.get('/itens', ClientController.index);
routes.get('/itens/:id', ClientController.show);
routes.post('/itens', ClientController.store);
routes.put('/itens/:id', ClientController.update);
routes.delete('/itens/:id', ClientController.destroy);


module.exports = routes;