const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const userControler = require('../schema/sqlUsers')

router.get('/novoUser', userControler.consultaBanco)
router.post('/novoUser', userControler.addUser)
router.post('/atualizarUser/:id', userControler.editarUsuário)
router.get('/deleteUser/:id', userControler.deleteUsuario)


module.exports = router