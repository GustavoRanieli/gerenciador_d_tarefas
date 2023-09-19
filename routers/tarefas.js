const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const tarefasController = require('../schema/sqlTarefas')

// Gets
router.get('/deleteTarefa/:id', tarefasController.deletarTarefa)
router.get('/tarefa/:id', tarefasController.detalhesTarefa)

// Posts
router.post('/novaTarefa', tarefasController.adicionarTarefa)
router.post('/atualizarTarefa/:id', tarefasController.editarTarefa)
router.post('/consultarTarefa/:id', tarefasController.consultarTarefas)
router.post('/consultarTarefaEspecifica/:id', tarefasController.consultarTarefaEspecifica)

module.exports = router