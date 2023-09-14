const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const userControler = require('../schema/sqlUsers')

router.post('/consultarUser', userControler.consultaBanco)
router.get('/deleteUser/:id', userControler.deleteUsuario)

router.post('/novoUser', userControler.addUser)
router.post('/atualizarUser/:id', userControler.editarUsuário)
router.post('/loginUser', userControler.loginUsuario)


module.exports = router