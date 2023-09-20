const express = require('express');
const router = express.Router();

// Controler Banco de Dados
const userControler = require('../schema/sqlUsers')

// Gets
router.get('/deleteUser/:id', userControler.deleteUsuario);
router.get('/allUsers', userControler.consultarTodosUsers);
router.get('/administrate', userControler.renderizarAdmin);
router.get('/paginainicial', userControler.renderizarUsuario)
router.get('/breakUser', userControler.quebrarLogin)

// Posts
router.post('/consultarUser', userControler.consultaBanco);
router.post('/novoUser', userControler.addUser);
router.post('/atualizarUser/:id', userControler.editarUsuário);
router.post('/loginUser', userControler.loginUsuario);


module.exports = router