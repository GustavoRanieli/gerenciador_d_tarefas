const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const tarefasController = require('../schema/sqlTarefas')

// Gets
router.get('/deleteTarefa/:id', tarefasController.deletarTarefa)
router.get('/tarefa/:id', tarefasController.detalhesTarefa)
router.get('/tarefaUser/:id', tarefasController.detalhesTarefaUser)


// Posts
router.post('/novaTarefa', tarefasController.adicionarTarefa)
router.post('/atualizarTarefa/:id', tarefasController.editarTarefa)
router.post('/atualizarTarefaUser/:id', tarefasController.editarTarefaUser)
router.post('/atualizarEstado', tarefasController.atualizarEstado)
router.post('/consultarTarefa/:id', tarefasController.consultarTarefas)
router.post('/consultarTarefaEspecifica/:id', tarefasController.consultarTarefaEspecifica)

module.exports = router