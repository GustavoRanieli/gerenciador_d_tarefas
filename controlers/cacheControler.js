const cache = require('../controlers/cache')


const cacheControler = {
    id_admin: function ( req, res ) {
        let adminID = cache.get('id_admin');
        res.json(adminID);
        // Id do Admin ao logar
    },

    id_userLongin: function ( req, res ) {
        let userID = cache.get('id_user');
        res.json(userID);
        // Id do Usuário ao logar
    },

    id_consult_task: function ( req, res ) {
        let userID_Taks = cache.get('id_user_para_consultar_tarefas');
        res.json(userID_Taks);
        // Id do usuário selecionado no painel do ADMIN
    },

}

module.exports = cacheControler