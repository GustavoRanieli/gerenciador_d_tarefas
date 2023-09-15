const express = require('express');
const router = express.Router();

// Controler
const cacheControler = require('../controlers/cacheControler')

// Gets
router.get('/adminIdent', cacheControler.id_admin);
router.get('/userIdent', cacheControler.id_userLongin);
router.get('/userTaksIdent', cacheControler.id_consult_task);


module.exports = router