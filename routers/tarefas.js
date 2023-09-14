const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const tarefasController = require('../schema/sqlTarefas')

router.get('/consultarTarefa/:id', tarefasController.consultarTarefas)
router.post('/novoTarefa', tarefasController.adicionarTarefa)
router.post('/atualizarTarefa/:id', tarefasController.editarTarefa)
router.get('/deleteTarefa/:id', tarefasController.deletarTarefa)


module.exports = router