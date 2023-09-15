const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const tarefasController = require('../schema/sqlTarefas')

// Gets
router.post('/consultarTarefa/:id', tarefasController.consultarTarefas)
router.get('/deleteTarefa/:id', tarefasController.deletarTarefa)


// Posts
router.post('/novoTarefa', tarefasController.adicionarTarefa)
router.post('/atualizarTarefa/:id', tarefasController.editarTarefa)


module.exports = router